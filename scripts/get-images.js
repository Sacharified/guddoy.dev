const os = require("os");
const fs = require("fs");
const getContent = require("./get-content");
const axios = require("axios");
const sqip = require("sqip").default;
const sharp = require("sharp");
const path = require("path");

const PATHS = {
	IMG: `${os.tmpdir()}/img`,
	IMG_ORIGINAL: name => `/${os.tmpdir()}/img/${name}/original`,
	IMG_CONVERTED: (name, type) => `/img/${name}/image.${type}`,
	STATIC: path.resolve(__dirname, "../src/static/content")
}

const createDir = dir => fs.mkdirSync(dir, { recursive: true });

const ensurePath = (path) => {
	if (!fs.existsSync(path)) {
		createDir(path);
	}

}
const createWriteStream = path => {
	ensurePath(path.substr(0, path.lastIndexOf("/")));
	return fs.createWriteStream(path, { flags: "w" });
}

const writeFile = (path, data) => {
	const dir = path.substr(0, path.lastIndexOf("/"));
	ensurePath(dir);
	fs.writeFileSync(path, data);
}

const isImage = ({ fields: { file } }) => file && file.details.hasOwnProperty("image");

const getImages = assets => assets.filter(asset => isImage(asset));
const downloadImage = async (image, location) => {
    const { fields: { file: { url } } } = image;
        return axios.get(`http:${url}`, { responseType: "stream" })
            .then(response => {
                return new Promise((res, rej) => {
                    response.data
                        .pipe(createWriteStream(location))
                        .on("finish", res)
                        .on("error", rej);
                });
            });
};

const downloadImages = async images => {
    for (image of images) {
        await downloadImage(image, PATHS.IMG_ORIGINAL(image.fields.file.fileName));
	}
	
	return fs.readdirSync(PATHS.IMG);
}

const convertToWebp = async (buffer, fileName) => {
	const path = `${PATHS.STATIC}${PATHS.IMG_CONVERTED(fileName, "webp")}`
	const webpBuffer = await sharp(buffer)
		.webp()
		.toBuffer();
	
	writeFile(path, webpBuffer);
	return path;
}

const convertToJpeg = async (buffer, fileName) => {
	const path = `${PATHS.STATIC}${PATHS.IMG_CONVERTED(fileName, "jpeg")}`
	const webpBuffer = await sharp(buffer)
		.jpeg()
		.toBuffer();
	
	writeFile(path, webpBuffer);
	return path;
}

const convertToSqip = async (path, fileName) => {
	const writePath = `${PATHS.STATIC}${PATHS.IMG_CONVERTED(fileName, "svg")}`
	const res = await sqip({ input: path });

	writeFile(writePath, res.svg);
	return writePath;
}

const optimiseImage = async fileName => {
	const original = PATHS.IMG_ORIGINAL(fileName);
	const originalBuffer = fs.readFileSync(original);
	const jpeg = await convertToJpeg(originalBuffer, fileName);

	const [webp, svg] = await Promise.all([
		convertToWebp(originalBuffer, fileName),
		convertToSqip(jpeg, fileName)
	]);

	return { jpeg, webp, svg };
}

const optimiseImages = images => Promise.all(images.map(async image => await optimiseImage(image)));

const main = async assets => {
	if (!assets) {
		const { includes: { Asset = [] } } = await getContent();
		assets = Asset;
	}
    const images = getImages(assets);
	const files = await downloadImages(images);
	const optimisedFiles = await optimiseImages(files);
}
module.exports = main;
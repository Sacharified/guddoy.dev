// eslint-disable-next-line no-global-assign
require = require("esm")(module);
require("dotenv").config()
const withImages = require("next-images");
const merge = require("webpack-merge");
const path = require("path");
const getContent = require("./scripts/get-content");
// const getImages = require("./scripts/get-images");

const {
	CONTENTFUL_ACCESS_TOKEN,
	CONTENTFUL_SPACE_ID,
	OXFORD_DICTIONARY_APP_ID,
	OXFORD_DICTIONARY_APP_KEY,
	NODE_ENV
} = process.env;
module.exports = withImages({
	webpack(config) {
		return merge({
			resolve: {
				modules: [
					path.join(__dirname, "src"),
					path.join(__dirname, "static"),
				]
			}
		}, config);
	},
	publicRuntimeConfig: {
		mode: NODE_ENV,
		CONTENTFUL_ACCESS_TOKEN,
		CONTENTFUL_SPACE_ID,
		OXFORD_DICTIONARY_APP_ID,
		OXFORD_DICTIONARY_APP_KEY,
	},
	exportPathMap: async function () {
		const paths = {
			"/": { page: "/" },
			"/blog": { page: "/blog" },
		};
		const { items } = await getContent();
		// await getImages(Asset);
		items.forEach(post => {
			paths[`/post/${post.fields.slug}`] = { page: "/post", query: { id: post.sys.id, slug: post.fields.slug } };
		});

		return paths;
	}
});
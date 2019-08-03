// eslint-disable-next-line no-global-assign
require = require("esm")(module);
require("dotenv").config()
const fs = require("fs");
const path = require("path");
const ContentService = require("../src/api/services/content").default;
const { fetchContent } = require("../src/api/services/content");
const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;
const service = new ContentService(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);

module.exports = async (filePath) => {
    const data = await fetchContent(service);
    if (filePath) {
        fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data), { flag: "w" });
    }

    return data;
};
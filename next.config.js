// eslint-disable-next-line no-global-assign
require = require("esm")(module);
require("dotenv").config()
const withImages = require("next-images");
const merge = require("webpack-merge");
const path = require("path");
const ContentService = require("./src/api/services/content").default;
const { fetchContent } = require("./src/api/services/content");
const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, NODE_ENV } = process.env;
const service = new ContentService(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);
module.exports = withImages({
	webpack(config, options) {
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
		CONTENTFUL_SPACE_ID
	},
	exportPathMap: async function () {
		const paths = {
			"/": { page: "/" },
			"/blog": { page: "/blog" },
		};
		const store = await fetchContent(service);
		store.items.forEach(post => {
			paths[`/post/${post.fields.slug}`] = { page: "/post", query: { id: post.sys.id, slug: post.fields.slug } };
		});

		return paths;
	}
});
require('dotenv').config()
const withImages = require(`next-images`);
const merge = require(`webpack-merge`);
const path = require(`path`);
const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, NODE_ENV } = process.env;

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
	}
});
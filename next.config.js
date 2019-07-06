const withImages = require(`next-images`);
const merge = require(`webpack-merge`);

module.exports = withImages({
	webpack(config, options) {
		return merge({
			resolve: {
				modules: [
					__dirname,
				]
			}
		}, config);
	}
});
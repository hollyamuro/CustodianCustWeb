const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {	
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("development")
			}
		}),
		// new BundleAnalyzerPlugin(),
	],
});
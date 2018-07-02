
module.exports = {
	entry: {		
		custodiancust_data1_compoent:
		"./src/component/custodiancust_data1_compoent/custodiancust_data1_compoent.js",
		custodiancust_demo1_compoent:
		"./src/component/custodiancust_demo1_compoent/custodiancust_demo1_compoent.js",	
		
	},
	output: {
		path: `${__dirname}/public/dist`,
		filename: "[name]_bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["react"],
				},
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: "initial",
			name: "vendors",
			cacheGroups: {
                vendors: {
                    test: /node_modules\//,
                },
            }
		}
	},
};
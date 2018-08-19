module.exports = {

	entry: {		
		polyfill: "./src/components/Polyfill",
		demo: "./src/components/demo.js",
		dashboard: "./src/DashboardRender",
		position_inquiry: "./src/PositionInquiryRender",
		charge_off_history: "./src/ChargeOffHistoryRender",
		not_charge_off_history: "./src/NotChargeOffHistoryRender",
		monthly_statement_download: "./src/MonthlyStatementDownloadRender",
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
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader",
			},
			{
				test: /\.css$/,
				loader:   "css-loader",
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
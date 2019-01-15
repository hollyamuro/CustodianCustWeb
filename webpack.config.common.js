module.exports = {

	entry: {		
		polyfill: "./src/Polyfill",
		dashboard: "./src/DashboardRender",
		position_inquiry: "./src/PositionInquiryRender",
		charge_off_history: "./src/ChargeOffHistoryRender",
		not_charge_off_history: "./src/NotChargeOffHistoryRender",
		monthly_statement_download: "./src/MonthlyStatementDownloadRender",
		safekeeping: "./src/SafekeepingRender"
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
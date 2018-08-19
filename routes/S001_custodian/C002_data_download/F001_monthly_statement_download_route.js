/**
 * 庫存查詢 routes
 * @module routes/S001_custodian/C002_data_download/F001_monthly_statement_download_route.js
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const monthlyStatementDownloadController = require("../../../controllers/S001_custodian/C002_data_download/F001_monthly_statement_download_controller");
	router.all("/", monthlyStatementDownloadController.init);
	// router.post("/read", monthlyStatementDownloadController.read);
	return router;
})();
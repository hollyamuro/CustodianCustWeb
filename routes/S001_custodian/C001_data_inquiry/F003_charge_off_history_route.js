/**
 * 庫存查詢 routes
 * @module routes/S001_custodian/C001_data_inquiry/F003_charge_off_history_route.js
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const chargeOffHistory = require("../../../controllers/S001_custodian/C001_data_inquiry/F003_charge_off_history_controller");
	router.all("/", chargeOffHistory.init);
	router.post("/read", chargeOffHistory.read);
	return router;
})();
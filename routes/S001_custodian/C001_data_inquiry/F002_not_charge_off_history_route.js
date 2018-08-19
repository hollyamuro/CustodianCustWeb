/**
 * 庫存查詢 routes
 * @module routes/S001_custodian/C001_data_inquiry/F002_not_charge_off_history_route.js
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const NotChargeOffHistory = require("../../../controllers/S001_custodian/C001_data_inquiry/F002_not_charge_off_history_controller");
	router.all("/", NotChargeOffHistory.init);
	router.post("/read", NotChargeOffHistory.read);
	return router;
})();
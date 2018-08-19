/**
 * 庫存查詢 routes
 * @module routes/S001_custodian/C001_data_inquiry/F001_position_inquiry_route.js
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const positionInquiryController = require("../../../controllers/S001_custodian/C001_data_inquiry/F001_position_inquiry_controller");
	router.all("/", positionInquiryController.init);
	router.post("/read", positionInquiryController.read);
	return router;
})();
/**
 * 擔保品 routes
 * @module routes/S001_custodian/C001_data_inquiry/F004_safekeeping_route
 */

module.exports = (() => {
	const express = require("express");
	const router = express.Router();
	const safekeepingController = 
        require("../../../controllers/S001_custodian/C001_data_inquiry/F004_safekeeping_controller");
	router.all("/", safekeepingController.init);
	router.post("/read/holding", safekeepingController.readHolding);
	router.post("/read/balance", safekeepingController.readBalance);    
	return router;
})();
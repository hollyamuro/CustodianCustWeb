const express = require("express");
const router = express.Router();

const data_inquiry1_controller = require("../../../controllers/S001_custodian_web/C001_data/F001_data_inquiry1_controller");

/* route to the page */
router.get("/", data_inquiry1_controller.data_inquiry1_init);             

/* add another route here if necessary */

module.exports = router;

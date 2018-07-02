const express = require("express");
const router = express.Router();

const demo1_controller = require("../../../controllers/S001_custodian_web/C003_demo/F001_demo1_controller");

/* route to the page */
router.get("/", demo1_controller.demo1_init);             

  
/* add another route here if necessary */

module.exports = router;

const express = require("express");
const router = express.Router();

const password_reset_email_controller = require("../../../controllers/S099_setting/C001_personal_setting/F001_password_reset_controller");


/* route to the page */
router.get("/", password_reset_email_controller.init); 
router.post("/send", password_reset_email_controller.send);          

/* add another route here if necessary */

module.exports = router;

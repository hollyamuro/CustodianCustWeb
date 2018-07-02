/**
 * 系統框架路由
 * @module routes/SystemFrameRoute.js
 */

 "use strict";

const systemFrameRoute = () => {
    const debug = require("debug")("CustodianCustWeb:systmeFrameRoute");

    const express = require("express");
    const router = express.Router();
    const systemFrameController = require("../controllers/SystemFrameController");

    debug("*** add systemFram router");

    router.get("/", systemFrameController.home );
    router.post("/", systemFrameController.login );
    router.all("/demo", systemFrameController.demo );
    router.all("/logout", systemFrameController.logout );
    /* other route add here */

    return router;
}

module.exports = systemFrameRoute();

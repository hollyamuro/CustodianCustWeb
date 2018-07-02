/**
 * 系統框架路由
 * @module routes/SystemFrameRoute.js
 */

 "use strict";

const systemFrameRoute = () => {
    const express = require("express");
    const router = express.Router();
    const systemFrameController = require("../controllers/SystemFrameController");

    router.get("/", systemFrameController.home );
    router.post("/", systemFrameController.login );
    router.all("/demo", systemFrameController.demo );
    router.all("/logout", systemFrameController.logout );
    /* other route add here */

    return router;
}

module.exports = systemFrameRoute();

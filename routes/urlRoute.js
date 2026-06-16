const express = require("express");

const router = express.Router();

const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.shortenUrl);
//Redirection route
router.get("/:shortId", urlController.redirectUrl);
//Analytics route
router.get("/analytics/:shortId", urlController.getAnalytics);
//Home Page
router.get("/", urlController.getHomePage);

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const urlController = require("../controllers/urlController");

//Home Page
router.get("/", urlController.getHomePage);
// Route for shorting a new URL
router.post("/shorten", authMiddleware, urlController.shortenUrl);
//Redirection route
router.get("/:shortId", urlController.redirectUrl);
//Analytics route
router.get("/analytics/:shortId", authMiddleware, urlController.getAnalytics);

module.exports = router;

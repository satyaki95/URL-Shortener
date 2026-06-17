const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Render Registration Form
router.get("/register", (req, res) => {
  res.render("register");
});
// Render Login Form
router.get("/login", (req, res) => {
  res.render("login");
});
// User Registration Route
router.post("/register", authController.registerUser);
// User Login Route
router.post("/login", authController.loginUser);
// User Logout Route
router.get("/logout", authController.logoutUser);

module.exports = router;

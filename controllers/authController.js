const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User registration
exports.registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = new User({
      userName,
      email,
      password,
    });
    await user.save();
    res.json({ message: "User Register Successfully" });
  } catch (error) {
    res.json({ message: "User Register Failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "Invalid Email or Password",
      });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.render("login", {
        error: "Invalid Email or Password",
      });
    }

    // Create a token
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    // Save Token in Cookies
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    res.render("login", { message: "Login Failed. Please Try Again" });
  }
};

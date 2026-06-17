const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/urlRouter");
const authRouter = require("./routes/authRouter");

const app = express();
const port = 3000;
app.set("view engine", "ejs");

//Connect Database
mongoose
  .connect("mongodb://localhost:27017/urlshortener")
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((error) => {
    console.log("Db not connected", error);
  });

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", urlRouter);
app.use("/api", urlRouter);
app.use("/auth", authRouter);

//Listening port
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}/`);
});

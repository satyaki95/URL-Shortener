const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/urlRoute");

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
app.use("/api", urlRoute);

//Listening port
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}/`);
});

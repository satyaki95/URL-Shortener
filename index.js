const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/urlRouter");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
const port = 3000;

//Deployment
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

//Connect Database
// const mongoUrl = process.env.MONGODB_URL;
const mongoUrl = "mongodb+srv://wwwsatyaki95_db_user:m8psGzvTZOL3zYtK@cluster0.6xuymz4.mongodb.net/?appName=Cluster0";

const connectDatabase = async () => {
  if (!mongoUrl) {
    console.error(
      "MONGODB_URL is not defined. Set this environment variable before starting the app."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected Successfully");
  } catch (error) {
    console.log("Db not connected", error);
  }
};

connectDatabase();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api", urlRouter);
app.use("/", urlRouter);

//Listening port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`);
  });
}

module.exports = app;

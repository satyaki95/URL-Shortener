const shortid = require("shortid");

const URL = require("../models/urlModel");

// Create Short URL
const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const shortCode = shortid.generate();
    await URL.create({
      shortCode,
      originalUrl,
      visitedHistory: [],
    });
    res.redirect("/api");
    // return res.json({ shortCode });
  } catch (error) {
    console.log("Failed to short the URL", error);
  }
};

//Redirect to the URL
const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await URL.findOne({ shortCode: shortId });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    const visitedEntry = {
      visitCount: url.visitedHistory.length + 1,
      visitTime: new Date(),
    };

    url.visitedHistory.push(visitedEntry);
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
};
//Analytics the url
const getAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await URL.findOne({ shortCode: shortId });

    if (url) {
      res.render("urlDetails", { url });
    } else {
      res.status(404).render("error", { message: "Url not found" });
    }

    // if (!url) {
    //   return res.status(404).json({ error: "URL not found" });
    // }

    // return res.status(200).json({
    //   totalClicks: url.visitedHistory.length,
    //   analytics: url.visitedHistory,
    // });
  } catch (error) {
    res.status(500).json({ error: "url not found", error });
  }
};
//Home Page
const getHomePage = async (req, res) => {
  try {
    const urls = await URL.find();
    res.render("index", { urls });
  } catch (error) {
    res.status(500).render("error", { message: "Error Fetching URLs" });
  }
};
module.exports = {
  shortenUrl,
  redirectUrl,
  getAnalytics,
  getHomePage,
};

const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata } = require("../models/model.js");

router.get("/home_search", async (req, res) => {
  const userId = req.query.userId;
  const user = await Usersdata.findById(userId).exec();
  if (!user) {
    // Handle user not found
    return res.status(404).send("User not found");
  }
  try {
    const searchQuery = req.query.service;
    console.log(searchQuery);
    if (!searchQuery || searchQuery.trim() === "") {
      return res
        .status(400)
        .json({ error: true, message: "Service query parameter is required" });
    }

    const businesses = await Buisnessdata.find({
      verify: true,
      "services.name": { $regex: searchQuery, $options: "i" },
    });

    if (businesses.length === 0) {
      console.log("No businesses found");
    } else {
      //console.log('Businesses found:', businesses);
      res.render("user/homepage", { blist: businesses, user: user });
    }
  } catch (error) {
    console.error("Error searching businesses:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

module.exports = { router };

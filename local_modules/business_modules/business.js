const express = require("express");
const { Buisnessdata } = require("../models/model");
const router = express.Router();

router.get("/services", async (req, res) => {
  const bId = req.query.bId;
  const business = await Buisnessdata.findById(bId).exec();
  if (!business) {
    return res.status(404).send("Business not found");
  }
  res.render("business/services", { business: business, bId: bId });
});

router.post("/acceptservice", async (req, res) => {
  const bId = req.body.id;
  const service = req.body.service;
  const min = req.body.minprice;
  const max = req.body.maxprice;
  const desc = req.body.description;

  if (!bId) {
    return res.status(400).send("Business ID is missing");
  }

  try {
    const business = await Buisnessdata.findById(bId).exec();
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Create a new service object
    const newService = {
      name: service,
      minprice: min,
      maxprice: max,
    };
    console.log(business.description);
    // Only add the description if it is 'null' or empty in the business object
    if (!business.description) {
      if (desc !== "null" && desc.trim() !== "") {
        business.description = desc;
      }
    }

    business.services.push(newService); // Adds the new service to the existing array

    await business.save();
    console.log("Added service successfully");

    // Send a response indicating success
    res.render("business/buisness", { business: business });
  } catch (err) {
    // Handle error
    console.error("Error updating business:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { router };

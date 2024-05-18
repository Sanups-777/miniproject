const express = require("express");
const { Buisnessdata } = require("../models/model");
const router = express.Router();

router.get("/services", async (req, res) => {
  const bId = req.query.bId;
  res.render("business/services", { bId: bId });
});

router.post("/acceptservice", async (req, res) => {
  const bId = req.body.id;
  const service = req.body.service;
  const min = req.body.minprice;
  const max = req.body.maxprice;

  if (!bId) {
    return res.status(400).send("Business ID is missing");
  }
  try {
    const business = await Buisnessdata.findById(bId).exec();
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Create a new service object and add it to the services array
    const newService = {
      name: service,
      minprice: min,
      maxprice: max,
    };
    business.services.push(newService); // This line adds the new service to the existing array

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

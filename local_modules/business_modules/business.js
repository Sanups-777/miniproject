const express = require("express");
const { Buisnessdata } = require("../models/model");
const router = express.Router();

router.get("/services",async(req,res)=>{
    const bId = req.query.bId;
    res.render("business/services",{bId} );
  
  });

router.post("/service",async (req,res)=>{
    const bId = req.body.bId;
    const service=req.body.service;
    const min=req.body.minprice;
    const max=req.body.maxprice;
    console.log("services")
    if (!bId) {
      return res.status(400).send(" User ID is missing");
    }
    try {
      const business = await Buisnessdata.findById(bId).exec();
      if (!business) {
  return res.status(404).send("Business not found");
      }
      business.services = {
        name: service,
        minprice: min,
        maxprice: max
    };
    const updatedBusiness = await business.save();

        // Send a response indicating success
        res.status(200).send("Business service updated successfully",updatedBusiness);
    } catch (err) {
        // Handle error
        console.error('Error updating business:', err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = { router };
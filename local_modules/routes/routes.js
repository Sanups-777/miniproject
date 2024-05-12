const express = require("express");
const router = express.Router();
const path = require("path");
const { Usersdata, Buisnessdata } = require("../models/model.js");
const { mail } = require("../feedback_modules/feedback.js");
const booking = require("../appointments/appointments.js");

router.get("/login", (req, res) => {
  res.render("authentication/login");
});

router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});

router.get("/index", (req, res) => {
  res.render("webpages/index");
});
router.get("/homepage", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    const data = await Buisnessdata.find({}).skip(skip).limit(limit);

    res.render("webpages/homepage", { blist: data });
  } catch (err) {
    console.error("Error fetching Buisnessdata collection:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/homepage/viewbusiness", async (req, res) => {
  // Extract the businessId from the query parameters
  const businessId = req.query.businessId;
  if (!businessId) {
    return res.status(400).send("Business ID is missing");
  }
  // Assuming blist is an array of business objects
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const business = await Buisnessdata.findById(businessId).exec();

    if (!business) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }

    // Render the view template passing business data
    res.render("webpages/viewbuisness", { business: business });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/login/homepage", async (req, res) => {
  const userid = req.query.id;
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  if (!userid) {
    return res.status(400).send("userid is missing");
  }
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const user = await Usersdata.findById(userid).exec();
    const data = await Buisnessdata.find({}).skip(skip).limit(limit);
    if (!user) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }
    console.log(user);
    // Render the view template passing business data
    res.render("webpages/homepage", { user: user, blist: data });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxFIX RESET XXXXXXXXXXXXXXX//////////////////
router.get("/reset", (req, res) => {
  // (Usersdata.find({})
  //   .then((data) => {
  //     res.render('reset', {
  //       userlist: data
  //     });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).send("Internal Server Error");
  //   }));)
  res.render("authentication/login");
});

router.get("/nav", (req, res) => {
  res.render("nav-footer/navbardisplay");
});

router.get("/index", (req, res) => {
  res.render("authentication/login");
});

// Define your services array
const services = ["Pest Control", "Cleaning", "Plumbing", "Electrical"];

// Render the service page and pass the services array to the template
router.get("/services", (req, res) => {
  res.render("webpages/services", { services: services });
});

router.use("/business", booking.router);
// router.get("/booking", (req, res) => {
//   res.redirect("");
// });
router.post("/send-email", mail);

module.exports = { router };

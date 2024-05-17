const express = require("express");
const router = express.Router();
const path = require("path");
const { Buisnessdata } = require("../models/model.js");
const { mail } = require("../feedback_modules/feedback.js");
const booking = require("../appointments/appointments.js");
const servicefun = require("../Servicesfunction/service.js");
const {requireAuth, checkuser}=require("../authentication_modules/token/auth.js");
const logout = require("../authentication_modules/logout.js");
router.get('*',checkuser)
// const signup = require("../authentication_modules/signup/");  
// const login = require("../authentication_modules/login.js");  
router.use("/logout", logout.router);


router.get("/login", (req, res) => {
  res.render("authentication/login");
});

router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});
// router.use("signup", signup.router);
// router.use("login", login.router);

router.get("/index", (req, res) => {
  res.render("webpages/index");
});
router.get("/homepage", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    //console.log("ceheck");
    const data = await Buisnessdata.find({}).skip(skip).limit(limit);

    res.render("user/homepage", { blist: data });
  } catch (err) {
    console.error("Error fetching Buisnessdata collection:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/homepage/viewbusiness",requireAuth, async (req, res) => {
  // Extract the businessId and userId from the query parameters
  const businessId = req.query.businessId;
  if (!businessId ) {
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
    // Render the view template passing business data and user data
    res.render("webpages/viewbuisness", { business: business });
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

// Render the service page and pass the services array to the template
router.get("/services", async (req, res) => {
  try {
    // Fetch all documents from the Buisnessdata collection
    const businesses = await Buisnessdata.find({}, "services");

    // Extract services from each document
    const services = businesses.map((business) => business.services);
    const minprice = servicefun.calculateAverage(services, "minprice");
    const maxprice = servicefun.calculateAverage(services, "maxprice");
    // Render the services view and pass the services data
    res.render("webpages/services", {
      services: services,
      minprice: minprice,
      maxprice: maxprice,
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error fetching services:", error);
    res.status(500).send("Error fetching services");
  }
});

router.use("/business", booking.router);

// router.get("/booking", (req, res) => {
//   res.redirect("");
// });
router.post("/send-email", mail);

module.exports = { router };

const express = require("express");
const router = express.Router();
const path = require("path");
const {
  Usersdata,
  Buisnessdata,
  Appointments,
  Reviews,
} = require("../models/model.js");
const { mail } = require("../feedback_modules/feedback.js");
const business = require("../business_modules/business.js");
const servicefun = require("../Servicesfunction/service.js");
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
  const userid = req.query.id;
  console.log(userid);
  if (userid) {
    // if (!userid) {
    //   return res.status(400).send("userid is missing");
    // }
    try {
      // Assuming BusinessData is your Mongoose model/schema
      const user = await Usersdata.findById(userid).exec();
      const data = await Buisnessdata.find({ verify: true });
      if (!user) {
        // Handle business not found
        return res.status(404).send("user not found");
      }
      console.log(user);
      // Render the view template passing business data
      res.render("user/homepage", { user: user, blist: data });
    } catch (err) {
      // Handle error
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } else {
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
  }
});

router.get("/homepage/viewbusiness", async (req, res) => {
  // Extract the businessId and userId from the query parameters
  const businessId = req.query.businessId;
  const userId = req.query.userId;

  // Ensure the businessId is provided
  if (!businessId) {
    return res.status(400).send("Business ID is required.");
  }

  try {
    // Fetch the business details
    const business = await Buisnessdata.findById(businessId).exec();
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Initialize user as null
    let user = null;

    // If a userId is provided, attempt to fetch the user
    if (userId) {
      user = await Usersdata.findById(userId).exec(); // UserData is assumed as your user model
    }

    // Fetch the top 2 reviews based on rating
    const reviews = await Reviews.find({ bid: businessId })
      .sort({ rating: -1 })
      .limit(2)
      .exec();
    if (!reviews) {
      // Handle business not found
      return res.status(404).send("review not found");
    }
    // Render the view template with business, user, and reviews data
    res.render("webpages/viewbuisness", {
      business: business,
      user: user,
      reviews: reviews, // Check if reviews exist before sending
    });
  } catch (err) {
    // Log the error and send a 500 response
    console.error("Error: ", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/checkout", async (req, res) => {
  const { appointmentId, userId } = req.query;
  console.log(appointmentId, userId);
  res.render("webpages/checkout", {
    appointmentId: appointmentId,
    userId: userId,
  });
});
router.get("/review", async (req, res) => {
  const { appointmentId, userId } = req.query;
  const appointment = await Appointments.findById(appointmentId).exec();
  if (!appointment) {
    // Handle business not found
    return res.status(404).send("appointment not found");
  }
  const bname = appointment.bname;
  const business = await Buisnessdata.findOne({ name: bname });
  res.render("webpages/reviewpage", {
    appointmentId: appointmentId,
    userId: userId,
    business: business,
  });
});

router.post("/submit-review", async (req, res) => {
  const { businessId, userId, appointmentId } = req.query;
  const { rating, service, description } = req.body;
  try {
    const newData = await Reviews.create({
      bid: businessId,
      uid: userId,
      rating: rating,
      service: service,
      description: description,
    });

    console.log("Review Inserted Successfully:", newData._id);
    const appointment = await Appointments.findById(appointmentId).exec();
    appointment.review = true;
    await appointment.save();
    const result = await Usersdata.findById(userId).exec();
    if (!result) {
      // Handle business not found
      return res.status(404).send("user not found");
    }
    let a = result.name;
    let e = result.email;
    let p = result.phno;
    let u = result.username;
    let i = result._id;
    res.render("user/userp", {
      name: a,
      email: e,
      phone: p,
      uname: u,
      id: i,
    });
  } catch (err) {
    console.error("Error inserting record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/paid", async (req, res) => {
  const { appointmentId, userId } = req.query;
  if (!appointmentId) {
    return res.status(400).send("appoinmentId is missing");
  }
  if (!userId) {
    return res.status(400).send(" User ID is missing");
  }
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const appoinment = await Appointments.findById(appointmentId).exec();
    if (!appoinment) {
      // Handle business not found
      return res.status(404).send("appoinment not found");
    }
    appoinment.paid = true;
    await appoinment.save();
    console.log(appoinment.paid);
    // Render the view template passing business data

    const result = await Usersdata.findById(userId).exec();
    if (!result) {
      // Handle business not found
      return res.status(404).send("user not found");
    }
    let a = result.name;
    let e = result.email;
    let p = result.phno;
    let u = result.username;
    let i = result._id;
    res.render("user/userp", {
      name: a,
      email: e,
      phone: p,
      uname: u,
      id: i,
    });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/reset", (req, res) => {
  res.render("user/reset");
});

router.post("/reset_pass", (req, res) => {
  const { email_reset, original_password, new_password, cpreset } = req.body;

  if (new_password !== cpreset) {
    return res.status(400).send("New passwords do not match");
  }

  Usersdata.findOne({ email: email_reset })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (user.password !== original_password) {
        return res.status(401).send("Original password is incorrect");
      }

      user.password = new_password; // Directly assigning the new password
      console.log("Password reset successfully");
      return user.save();
    })
    .then(() => {
      res.render("authentication/login");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/nav", (req, res) => {
  res.render("nav-footer/navbardisplay");
});

router.get("/checkout", (req, res) => {
  res.render("webpages/checkout");
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
const booking = require("../appointments/appointments.js");

router.use("/business", booking.router);
router.use("/Business", business.router);
// router.get("/booking", (req, res) => {
//   res.redirect("");
// });
router.post("/send-email", mail);

module.exports = { router };

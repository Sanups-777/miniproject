const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata, Appointments } = require("../models/model.js");

router.post("/booking", async (req, res) => {
  var bname = req.body.bname;
  var uname = req.body.uname;
  var date = req.body.date;
  var service = req.body.service;
  var issue = req.body.issue;
  const userId = req.body.userId;
  try {
    const newData = await Appointments.create({
      bname: bname,
      uname: uname,
      date: date,
      service: service,
      issue: issue,
      accepted: null,
      paid: false,
      review: false,
    });
    console.log("Appointment Inserted Successfully:", newData._id);
    res.render("webpages/bookingsuccessful", { userId: userId });
  } catch (err) {
    console.error("Error inserting record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/booking_details", async (req, res) => {
  const businessId = req.query.businessId;
  if (!businessId) {
    return res.status(400).send("Business ID or User ID is missing");
  }

  // Assuming blist is an array of business objects
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const business = await Buisnessdata.findById(businessId).exec();

    if (!business) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }
    Appointments.find({ accepted: null })
      .then((data) => {
        res.render("business/appointmentsb", {
          appointmentlist: data,
          business: business,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  //import the details from appointments over here in the meantime
});
router.get("/booking_detailsaccept", async (req, res) => {
  const businessId = req.query.businessId;
  if (!businessId) {
    return res.status(400).send("Business ID or User ID is missing");
  }

  // Assuming blist is an array of business objects
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const business = await Buisnessdata.findById(businessId).exec();

    if (!business) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }
    Appointments.find({ accepted: true })
      .then((data) => {
        res.render("business/appointmentsba", {
          appointmentlist: data,
          business: business,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  //import the details from appointments over here in the meantime
});
router.get("/accept_booking", async (req, res) => {
  const appointmentId = req.query.appointmentId;
  const businessId = req.query.businessId; // Assuming you're sending appointmentId in the request body
  if (!appointmentId || !businessId) {
    return res.status(400).send("appointmentId or businessId is missing");
  }

  try {
    const appointment = await Appointments.findById(appointmentId).exec();
    const business = await Buisnessdata.findById(businessId).exec();
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    if (!business) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }

    // Assuming you have a field in your Appointments model to mark the appointment as accepted
    appointment.accepted = true; // Marking the appointment as accepted
    await appointment.save(); // Saving the updated appointment
    console.log("Appointment accepted successfully");
    res.render("business/buisness", { business: business });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/reject_booking", async (req, res) => {
  const appointmentId = req.query.appointmentId;
  const businessId = req.query.businessId; // Assuming you're sending appointmentId in the request body
  if (!appointmentId || !businessId) {
    return res.status(400).send("appointmentId or businessId is missing");
  }

  try {
    const appointment = await Appointments.findById(appointmentId).exec();
    const business = await Buisnessdata.findById(businessId).exec();
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    if (!business) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }

    // Assuming you have a field in your Appointments model to mark the appointment as accepted
    appointment.accepted = false; // Marking the appointment as accepted
    await appointment.save(); // Saving the updated appointment
    console.log("Appointment accepted successfully");
    res.render("business/buisness", { business: business });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/accepted_booking_details", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send(" User ID is missing");
  }

  // Assuming blist is an array of business objects
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const user = await Usersdata.findById(userId).exec();

    if (!user) {
      // Handle business not found
      return res.status(404).send("Business not found");
    }
    Appointments.find({ accepted: { $in: [true, false] } })
      .then((data) => {
        res.render("user/appointmentsu", {
          appointmentlist: data,
          user: user,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = { router };

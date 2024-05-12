const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata, Appointments } = require("../models/model.js");

router.post("/booking", async (req, res) => {
  var bname = req.body.bname;
  var uname = req.body.uname;
  var date = req.body.date;
  var service = req.body.service;
  var issue = req.body.issue;
  try {
    const newData = await Appointments.create({
      bname: bname,
      uname: uname,
      date: date,
      service: service,
      issue: issue,
    });
    console.log("Appointment Inserted Successfully:", newData._id);
  } catch (err) {
    console.error("Error inserting record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/booking_details", (req, res) => {
  Appointments.find({})
    .then((data) => {
      res.render("business/appointments", {
        appointmentlist: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  console.log("check"); //import the details from appointments over here in the meantime
});

module.exports = { router };

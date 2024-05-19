const express = require("express");
const QRCode = require('qrcode');
const { Appointments, Usersdata } = require("../models/model");
const router = express.Router();

  router.post("/credit", async (req, res) => {
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
      paid(userId,res)
    } catch (err) {
      // Handle error
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  router.post("/upi", async (req, res) => {
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
      paid(userId,res)
    
    } catch (err) {
      // Handle error
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/credit", async (req, res) => {
    const { appointmentId, userId } = req.query;
    console.log(appointmentId, userId);
    res.render("webpages/payment/credit", {
      appointmentId: appointmentId,
      userId: userId,
    });
  });

  router.get("/upi", async (req, res) => {
    const { appointmentId, userId } = req.query;
    const appointment = await Appointments.findById(appointmentId).exec();
      if (!appointment) {
        // Handle business not found
        return res.status(404).send("appoinment not found");
      }
      const user = await Usersdata.findById(userId).exec();
      if (!user) {
        // Handle business not found
        return res.status(404).send("user not found");
      }
    try {
        const upiUrl = `/homesaver/checkout?userId=${userId}&appointmentId=${appointmentId}`;
        const qrCodeUrl = await QRCode.toDataURL(upiUrl);
        res.render('webpages/payment/upi', { userId:user._id, appointmentId:appointment._id, qrCodeUrl });
    } catch (err) {
        console.error('Error generating QR code', err);
        res.status(500).send('Error generating QR code');
    }
  });

  
function paid(userId,res){
    
    res.render('webpages/payment/paid',{userId});
}
module.exports={router}
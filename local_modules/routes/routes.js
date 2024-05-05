const express = require("express");
const router = express.Router();
const path = require('path');
const { Usersdata, Buisnessdata } = require('../models/model.js');
const{mail}=require('../feedback_modules/feedback.js');

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/reg.html"));
});

router.get("/mainpage", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/mainpage.html"));
});
router.get("/homepage", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    const data = await Buisnessdata.find({}).skip(skip).limit(limit);

    res.render("homepage", { blist: data });
  } catch (err) {
    console.error("Error fetching Buisnessdata collection:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/homepage/viewbusiness", (req, res) => {
  res.render("viewbuisness");
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
  res.sendFile(path.join(__dirname, "../../public/reset.html"));
});

router.get("/mainpage", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/mainpage.html"));
});
router.get("/mainpage", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/mainpage.html"));
});


router.post('/send-email', mail);

module.exports = { router };
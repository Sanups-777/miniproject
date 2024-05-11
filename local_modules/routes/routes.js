const express = require("express");
const router = express.Router();
const path = require("path");
const { Usersdata, Buisnessdata } = require("../models/model.js");
const { mail } = require("../feedback_modules/feedback.js");

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

router.get("/homepage/viewbusiness", (req, res) => {
  res.render("webpages/viewbuisness");
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

router.post("/send-email", mail);

module.exports = { router };

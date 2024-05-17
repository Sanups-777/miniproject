const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Usersdata, Buisnessdata } = require("../models/model");

// let mongooseConnection; // Change db to mongooseConnection
// function init(dbConnection) {
//   mongooseConnection = dbConnection;
//   // console.log("connected succesfully")
// }

router.get("/udetails", (req, res) => {
  Usersdata.find({})
    .then((data) => {
      res.render("admin/user_details", {
        userlist: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.post("/uremove", async (req, res) => {
  var email = req.body.email;
  console.log(email);
  var result;
  try {
    result = await Usersdata.findOne({ email: email }); // Use Usersdata model
  } catch (err) {
    console.log("User does not exist");
  }
  if (!result) {
    console.log("User not found");
  } else {
    await Usersdata.deleteOne({ email: email });
    console.log("User deleted");
    //res.redirect("/admin/udetails");
    res.render("admin/adminp");
  }
});

router.get("/bdetails", async (req, res) => {
  try {
    const data = await Buisnessdata.find({});
    // if (data.length === 0) {
    //   console.log('No data found in Buisnessdata collection');
    // } else {
    //   console.log('Data found in Buisnessdata collection');
    // }

    res.render("admin/business_details", { blist: data });
  } catch (err) {
    console.error("Error fetching Buisnessdata collection:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/bremove", async (req, res) => {
  var email = req.body.email;
  console.log(email);
  var result;
  try {
    result = await Buisnessdata.findOne({ email: email }); // Use Usersdata model
  } catch (err) {
    console.log("User does not exist");
  }
  if (!result) {
    console.log("User not found");
  } else {
    await Buisnessdata.deleteOne({ email: email });
    console.log("User deleted");
    // res.redirect("/admin/bdetails");
    res.render("admin/adminp");
  }
});
router.post("/bverify", async (req, res) => {
  var email = req.body.email;
  console.log(email);
  var result;

  try {
    result = await Buisnessdata.findOne({ email: email }); // Use Usersdata model
    result.verify = true;
    await result.save();
    res.render("admin/adminp");
  } catch (err) {
    console.log("User does not exist");
  }

  res.render("admin/adminp");
});

module.exports = { router };

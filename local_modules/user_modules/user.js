const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router();
const { Usersdata, Buisnessdata } = require('../model.js');

let db; // Change db to mongooseConnection
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}
router.post("/reset_pass", async (req, res) => {
  const { email_reset, original_password_reset, new_password_reset } = req.body;

  try {
    const user = await Usersdata.findOne({ email: email_reset });

    if (!user) {
      console.log("User does not exist");
      return res.status(404).send("User does not exist");
    }

    if (user.password !== original_password_reset) {
      console.log("Invalid username or password");
      return res.status(400).send("Invalid username or password");
    }

    await Usersdata.updateOne({ email: email_reset }, { $set: { password: new_password_reset } });

    // Redirect to the login page
    return res.redirect("/login.html");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.name;
    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ error: true, message: "Name query parameter is required" });
    }

    const business = await Buisnessdata.find({ name: { $regex: searchQuery, $options: 'i' } });
    if(!business){
    res.render('homepage', { blist: business });}
    else{console.log(businesses);}
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

module.exports = { init, router };

const express = require('express');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const { Usersdata, Buisnessdata } = require('./models');
const buisnessdata=require('../model');
let mongooseConnection; // Change db to mongooseConnection
function init(dbConnection) {
  mongooseConnection = dbConnection;
  // console.log("connected succesfully")
}

router.get('/details', (req, res) => {
  Usersdata.find({})
    .then((data) => {
      res.render('details', {
        userlist: data
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.post("/uremove", async (req, res) => {
  
    var email = req.body.nrem;
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
      res.redirect("/admin/details");
  }

    
});

module.exports = { init, router };

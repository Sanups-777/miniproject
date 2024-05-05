const express = require("express");
const router = express.Router();
const path = require('path');
const { Usersdata, Buisnessdata } = require('./model.js');

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/reg.html"));
});

router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});
router.get("/homepage", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
  
    try {
      const data = await Buisnessdata.find({})
        .skip(skip)
        .limit(limit);
  
      res.render("homepage", { blist: data });
    } catch (err) {
      console.error('Error fetching Buisnessdata collection:', err);
      res.status(500).send("Internal Server Error");
    }
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/reset.html"));
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});




module.exports = { init, router };
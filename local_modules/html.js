const express = require("express");
const router = express.Router();
const path = require('path');

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
router.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});
router.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});




module.exports = { init, router };
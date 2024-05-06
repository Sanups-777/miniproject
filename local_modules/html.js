const express = require("express");
const router = express.Router();
const path = require('path');
const Usersdata = require('./model');

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
    Usersdata.find({})
        .then((data) => {
            res.render('homepage', {
                userlist: data
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
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
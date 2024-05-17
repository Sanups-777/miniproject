const express = require("express");
const router = express.Router();
const{createToken}=require("./token/cookie-jwt")

router.get("/", async (req, res) => {
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
})

module.exports = { router};
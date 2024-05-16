const express = require("express");
const authentication = express.Router();
const path = require("path");

authentication.get("/login", (req, res) => {
    res.render("authentication/login");
  });
  
authentication.get("/signup", (req, res) => {
    res.render("authentication/signup");
  });

module.exports = { authentication };


const express = require("express");
const cookie = express.Router();
const cookie_Parser = require('cookie-parser');
cookie.use(cookie_Parser());





module.exports={cookie}
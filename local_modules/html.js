const express = require("express");
const router = express.Router();

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}






module.exports = { init, router };
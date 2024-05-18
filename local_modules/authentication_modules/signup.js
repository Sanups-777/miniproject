const express = require("express");
const router = express.Router();
const { Usersdata ,Buisnessdata } = require("../models/model");

router.post("/business", async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;

  try {
    const newData = await Buisnessdata.create({
      name: name,
      email: email,
      phone: phno,
      password: password,
      verify: false,
    });

    console.log("business Inserted Successfully:", newData._id);
    res.redirect("/homesaver/login");
  } catch (err) {
    console.error("Error inserting record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;

  try {
    const newData = await Usersdata.create({
      name: name,
      username: username,
      email: email,
      phno: phno,
      password: password,
    });

    console.log("user Inserted Successfully:", newData._id);
    res.redirect("/homesaver/login");
  } catch (err) {
    console.error("Error inserting record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { router };

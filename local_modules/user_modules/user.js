const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata, Appointments } = require("../models/model.js");
router.get("/reset", (req, res) => {
  res.render("user/reset");
});


router.post("/reset_pass", (req, res) => {
  const { email_reset, original_password, new_password, cpreset } = req.body;

  if (new_password !== cpreset) {
    return res.status(400).send("New passwords do not match");
  }

  Usersdata.findOne({ email: email_reset })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (user.password !== original_password) {
        return res.status(401).send("Original password is incorrect");
      }

      user.password = new_password; // Directly assigning the new password
      console.log("Password reset successfully");
      return user.save();
    })
    .then(() => {
      res.render("authentication/login");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = { router };

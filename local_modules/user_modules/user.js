const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata } = require('../models/model.js');

router.post("/reset_pass", async (req, res) => {
  const { email_reset, original_password_reset, new_password_reset } = req.body;

  try {
    const user = await Usersdata.findOne({ email: email_reset });

    if (!user) {
      console.log("User does not exist");
      return res.status(404).send("User does not exist");
    }

    if (user.password !== original_password_reset) {
      console.log("Invalid username or password");
      return res.status(400).send("Invalid username or password");
    }

    await Usersdata.updateOne(
      { email: email_reset },
      { $set: { password: new_password_reset } }
    );

    // Redirect to the login page
    return redirect("/homesaver/login");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = {router };

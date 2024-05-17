const express = require("express");
const router = express.Router();
const { Usersdata } = require('../models/user_models');

// router.post("/profile", async (req, res) => {
//     try {
//       var result = await Usersdata.findOne({ email: email });
//     } catch (err) {
//       res.status(400).json({});
//       console.log("User does not exist");
//     }

//     if (result) {
//       if (result.password == password) {
//         let a = result.name;
//         let e = result.email;
//         let p = result.phno;
//         let u = result.username;
//         res.render("user/userp", { name: a, email: e, phone: p, uname: u });
//       }
//   });

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

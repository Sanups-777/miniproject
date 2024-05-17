const express = require("express");
const router = express.Router();
const { Usersdata, Buisnessdata, Appointments } = require("../models/model.js");

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

router.get("/checkout", async (req, res) => {
  id = res.body.id;
  userId = req.query.userId;
  res.render("webpages/checkout", { id: id, userId: userId });
});

router.get("/paid", async (req, res) => {
  appoinmentId = req.query.appoinmentId;
  userId = req.query.userId;
  if (!appoinmentId) {
    return res.status(400).send("appoinmentId is missing");
  }
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send(" User ID is missing");
  }
  try {
    // Assuming BusinessData is your Mongoose model/schema
    const appoinment = await Appointments.findById(appoinmentId).exec();
    if (!appoinment) {
      // Handle business not found
      return res.status(404).send("appoinment not found");
    }
    console.log(user);
    // Render the view template passing business data

    const result = await Usersdata.findById(userId).exec();
    if (!result) {
      // Handle business not found
      return res.status(404).send("user not found");
    }
    if (result.password == password) {
      let a = result.name;
      let e = result.email;
      let p = result.phno;
      let u = result.username;
      let i = result._id;
      res.render("user/userp", {
        name: a,
        email: e,
        phone: p,
        uname: u,
        id: i,
      });
    }
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = { router };

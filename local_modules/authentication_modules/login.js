const express = require("express");
const { Usersdata, Buisnessdata } = require("../models/model");
const router = express.Router();

async function verification(password, res) {
  if (password === "password") {
    console.log("welcome admin", password);
    res.render("admin/adminp");
  } else {
    console.log("INVALID PASSWORD");
    res.redirect("/homesaver/login");
  }
}

router.post("/user", async (req, res) => {
  const { elog: email, plog: password } = req.body;
  console.log("User login attempt:", email, password);
  if (email === "Admin") {
    verification(password, res);
    return 0;
  } else {
    try {
      var result = await Usersdata.findOne({ email: email });
    } catch (err) {
      console.log("User does not exist");
    }

    if (result) {
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
      } else {
        console.log("incorrect password");
      }
    } else {
      console.log("incorrect email");
    }
  }
});

router.post("/business", async (req, res) => {
  const { elog: email, plog: password } = req.body;
  console.log("Business login attempt:", email, password);
  try {
    var result = await Buisnessdata.findOne({ email: email });
  } catch (err) {
    console.log("business does not exist");
  }
  if (result.password == password) {
    let a = result.name;
    let e = result.email;
    let p = result.phno;
    let u = result.username;

    res.render("business/buisness", { name: a, email: e, phone: p, uname: u });
  } else {
    console.log("NULL");
  }
});

module.exports = { router };

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

router.get("/user", async (req, res) => {
  const userid = req.query.id;
  console.log(userid)
  try {
    var data = await Usersdata.findOne({ _id: userid });
  } catch (err) {
    console.log("User does not exist");
  }
  if (data) {
      res.render("user/userp", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        uname: data.username,
        id: data._id,
      });
}})

router.post("/user", async (req, res) => {
  const { elog: email, plog: password } = req.body;
  console.log("User login attempt:", email, password);
  if (email === "Admin") {
    verification(password, res);
    return 0;
  } else {

      var data = await Usersdata.findOne({ email: email });
      if(data){
        if (data.password === password) {
          res.render("user/userp", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            uname: data.username,
            id: data._id,
          });
          
        } else {
          // Simulate unsuccessful login
          res.status(401).json({ error: 'Incorrect password' });
        }
      } else {
        // Simulate unsuccessful login
        res.status(401).json({ error: 'Incorrect email ' });
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
    res.render("business/buisness", { business: result });
  } else {
    console.log("incorrect password");
  }
});

module.exports = { router };

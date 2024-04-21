const express = require("express");
const router = express.Router();

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}

async function verification(email, password, res) {
  if (password === "password") {
    console.log("verify");
    let a = "Admin";
    res.render("adminp", { name: a });
  } else {
    console.log("INVALID PASSWORD");
    return res.redirect("login.html");
  }
}

router.post("/user", async (req, res) => {
  const { elog: email, plog: password } = req.body;
  console.log("User login attempt:", email, password);
  if (email === "Admin") {
    console.log("welcome admin", email, password);
    verification(email, password, res);
    return 0;
  }
  else{
  try {
    var result = await db.collection("users").findOne({ email: email });
  } catch (err) {
    console.log("User does not exist");
  }
  console.log(result);
  if (result) {
    if (result.password == password) {
      let a = result.name;
      let e = result.email;
      let p = result.phno;
      let u = result.username;
      res.render("userp", { name: a, email: e, phone: p, uname: u });
    } else {
      console.log("incorrect password");
    }
  } else {
    console.log("incorrect email");
  }}
});

router.post("/business", async (req, res) => {
  const { elog: email, plog: password } = req.body;
  console.log("Business login attempt:", email, password);
  try {
    var result = await db.collection("business-L").findOne({ email: email });
  } catch (err) {
    console.log("business does not exist");
  }
  if (result.password == password) {
    let a = result.name;
    let e = result.email;
    let p = result.phno;
    let u = result.username;

    res.render("userp", { name: a, email: e, phone: p, uname: u });
  } else {
    console.log("NULL");
  }
});

module.exports = { init, router };

const express = require("express");
const { Buisnessdata } = require("../models/model");
const { Usersdata }=require("../models/user_models")
const router = express.Router();

async function verification(password, res) {
  if (password === "password") {
    console.log("welcome admin", password);
    let a = "Admin";
    res.render("admin/adminp", { name: a });
  } else {
    console.log("INVALID PASSWORD");
    res.redirect("/homesaver/login");
  }
}

// router.post("/user", async (req, res) => {
//   const { elog: email, plog: password } = req.body;
//   console.log("User login attempt:", email, password);
//   if (email === "Admin") {
//     verification(password, res);
//     return 0;
//   } else {
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
//       } else {
//         console.log("incorrect password");
//       }
//     } else {
//       console.log("incorrect email");
//     }
//   }
// });
router.post("/user", async (req, res)=>{
  const {email, password} = req.body;
  try{
    const user = await Usersdata.login(email, password);
    res.status(200).json({user: Usersdata._id});
  }
  catch(err){
    res.status(400).json({});
  }
})

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

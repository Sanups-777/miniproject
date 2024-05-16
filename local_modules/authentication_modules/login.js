const express = require("express");
const { Buisnessdata } = require("../models/model");
const { Usersdata }=require("../models/user_models")
const router = express.Router();


router.use("/login", (req, res) => {
  res.render("authentication/login");
});
async function verification(password, res) {
  if (password === "password") {
    console.log("welcome admin", password);
    res.render("admin/adminp");
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
  console.log("check");
  try{
    const user = await Usersdata.login(email, password);
    res.status(200).json({user: user._id});
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
    res.render("business/buisness", { business: result });
  } else {
    console.log("incorrect password");
  }
});

module.exports = { router};

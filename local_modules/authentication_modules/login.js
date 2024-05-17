const express = require("express");
const { Buisnessdata } = require("../models/model");
const { Usersdata }=require("../models/user_models")
const router = express.Router();
const{createToken}=require("./token/cookie-jwt")
const maxAge =3 * 24 * 60 *60;

const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {
    email : '' ,password: '' 
 };
 if(err.message === 'incorrect email')
  {
  
    errors.email = 'email is not registered';
    
  }
  if(err.message === 'incorrect password')
    {
    
      errors.password = 'wrong password';
      
    }
  //validation errors
  if(err.message.includes('users validation failed'))
    {
      Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message;
      });
    }
    return errors;
    
}

// router.use("/login", (req, res) => {
//   res.render("authentication/login");
// });
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
  
  try{
    const user = await Usersdata.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt' , token , {httpOnly:true, maxAge: maxAge * 1000});
    res.status(200).json({user: user._id});
  }
  catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors});
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

const express = require("express");
const router = express.Router();
const{createToken}=require("./token/cookie-jwt")
const { Usersdata  } = require("../models/user_models.js");
const { Buisnessdata } = require("../models/model");




const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {
    email : '' ,password: '' 
 };
 //duplicate error code
 if(err.code === 11000)
  {
  
    errors.email = 'that email is already registered';
     return errors;
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
// const maxAge =3 * 24 * 60 *60;
// const createToken = (id) =>{
//   return jwt.sign({id}, 'net ninja secret', {
//     expiresIn: maxAge
//   });
// }

router.post("/users", async (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;                                     //sigup_post
  var phone = req.body.phone;
  var password = req.body.password;
    try {
      const newData = await Usersdata.create({
        name: name,
        username: username,
        email: email,
        phone : phone,
        password: password,
      });
      const token = createToken(newData._id);
      // console.log("Record Inserted Successfully:", newData._id);
      res.cookie('jwt' , token , {httpOnly:true, maxAge: maxAge * 1000});
      res.status(201).json({newData: newData._id});
      
      // res.redirect("/homesaver/homepage");
    } catch (err) {
      const errors = handleErrors(err);
    res.status(401).json({errors});
    }

});

 router.post("/business", async (req, res) => {
  var name = req.body.name;
   var username = req.body.username;
   var email = req.body.email;
   var phno = req.body.phno;
   var password = req.body.password;

   try {
     const newData = await Buisnessdata.create({
       name: name,
       username: username,
       email: email,
       phno: phno,
       password: password,
     });

     console.log("Record Inserted Successfully:", newData._id);
     res.redirect("/homesaver/login");
   } catch (err) {
     console.error("Error inserting record:", err);
     return res.status(500).json({ error: "Internal server error" });
   }
 });


module.exports = { router };

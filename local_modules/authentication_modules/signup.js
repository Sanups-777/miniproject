const express = require("express");
const router = express.Router();
const { Usersdata  } = require("../models/model");
const { Buisnessdata } = require("../models/model");
const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {
   name : '',username :'', email : '' ,phno : '',password: '' , conpassword : ''
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

router.post("/users", async (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;                                     //sigup_post
  var phno = req.body.phno;
  var password = req.body.password;

  try {
    const newData = await Usersdata.create({
      name: name,
      username: username,
      email: email,
      phone : phno,
      password: password,
    });

    console.log("Record Inserted Successfully:", newData._id);
    res.redirect("/homesaver/login");
  } catch (err) {
    const errors = handleErrors(err);
   res.status(400).json({errors});
  }
});

module.exports = { router };

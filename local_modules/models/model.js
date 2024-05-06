const mongoose = require("mongoose");
const { isEmail } = require('validator');

const udetailSchema = new mongoose.Schema({
  //id: mongoose.Schema.Types.ObjectId,
  //name: String,
  //username: String,
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  //phno: String,
  password:{
    type:String,
    required: true,
    minlength: [8,'Minimum password length is 8 charecters']
  } 
});

const Usersdata = mongoose.model("users", udetailSchema);

// const bdetailSchema = new mongoose.Schema({
//   id: mongoose.Schema.Types.ObjectId,
//   name: String,
//   email: String,
//   phone: String,
//   services: [String],
// });

//const Buisnessdata = mongoose.model("business-ls", bdetailSchema);

module.exports = { Usersdata};
// module.exports=Usersdata;

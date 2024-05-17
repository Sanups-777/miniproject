const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const udetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
//   name: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^[a-zA-Z]+$/.test(v); // Only alphabets allowed
//       },
//       message: props => `${props.value} contains numbers!`
//     }
//   },

//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },

  //username: String,
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },

//   phno: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^\d{10}$/.test(v); // 10 digits only
//       },
//       message: props => `${props.value} is not a valid phone number!`
//       }
//     },
  //phno: String,
  password:{
    type:String,
    required: true,
    minlength: [8,'Minimum password length is 8 charecters']
  } ,
//   conpassword: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return v === this.password; // Must match password field
//       },
//       message: props => `Passwords do not match!`
//     }
//   }
});

//fire a function after doc saved to db
udetailSchema.post('save' , function (doc, next){
  console.log('new user was created and saved' , doc);
  next();

 });

 //fire a function before doc saved to db
 udetailSchema.pre('save' ,async function (next){
  const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
 });

 
 //static method to login user
 udetailSchema.statics.login = async function(email, password){
  console.log(email,password);
  const user = await this.findOne({ email});
  if (user){
  const auth = await  bcrypt.compare(password, user.password);
  if(auth){
    return user;
  }
  throw Error('incorrect password');
  }
  throw Error('incorrect email')
 }
const Usersdata = mongoose.model("users", udetailSchema);



module.exports = { Usersdata};
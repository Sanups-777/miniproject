const mongoose = require("mongoose");
const { isEmail } = require('validator');

const udetailSchema = new mongoose.Schema({
  //id: mongoose.Schema.Types.ObjectId,
  //name: String,
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z]+$/.test(v); // Only alphabets allowed
      },
      message: props => `${props.value} contains numbers!`
    }
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  //username: String,
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },

  phno: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // 10 digits only
      },
      message: props => `${props.value} is not a valid phone number!`
      }
    },
  //phno: String,
  password:{
    type:String,
    required: true,
    minlength: [8,'Minimum password length is 8 charecters']
  } ,
  conpassword: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v === this.password; // Must match password field
      },
      message: props => `Passwords do not match!`
    }
  }
});

//fire a function after doc saved to db
 userSchema.post('save' , function (doc, next){
  console.log('new user was created and saved' , doc);
  next();

 });

 //fire a function before doc saved to db
 userSchema.pre('save' , function (doc){
    console.log('user about to be created and saved',this);
 })
const Usersdata = mongoose.model("users", udetailSchema);

const bdetailSchema = new mongoose.Schema({
//   id: mongoose.Schema.Types.ObjectId,
//   name: String,
name: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^[a-zA-Z]+$/.test(v); // Only alphabets allowed
    },
    message: props => `${props.value} contains numbers!`
  }
},
username: {
  type: String,
  required: true,
  unique: true
},
   email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
//   phone: String,
phno: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^\d{10}$/.test(v); // 10 digits only
    },
    message: props => `${props.value} is not a valid phone number!`
    }
  },
password:{
  type:String,
  required: true,
  minlength: [8,'Minimum password length is 8 charecters']
} ,
conpassword: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return v === this.password; // Must match password field
    },
    message: props => `Passwords do not match!`
  }
}
//   services: [String],
 });

const Buisnessdata = mongoose.model("business-ls", bdetailSchema);

module.exports = { Usersdata};
// module.exports=Usersdata;
module.exports = { Buisnessdata};

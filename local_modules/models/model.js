const mongoose = require("mongoose");

const udetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  phno: String,
  password: { type: String, required: true },
});
udetailSchema.statics.login = async function(email, password){
  console.log(email,password);
  const user = await this.findOne({ email});
  if (user){
    if(user.password===password){
      return user;
    }
    throw Error('incorrect password');
  }
    throw Error('incorrect email')
 }
 
const Usersdata = mongoose.model("users", udetailSchema);

const bdetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  password: { type: String, required: true },
  services: [
    {
      name: String,
      minprice: Number,
      maxprice: Number,
    },
  ],
  description: String,
  verify: Boolean,
});

const Buisnessdata = mongoose.model("business-ls", bdetailSchema);

const apdetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  bname: String,
  uname: String,
  date: Date,
  service: String,
  issue: String,
  accepted: Boolean,
  paid: Boolean,
  review: Boolean,
  review_id:mongoose.Schema.Types.ObjectId,
});

const Appointments = mongoose.model("appointments", apdetailSchema);

const reviewsSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  bid: mongoose.Schema.Types.ObjectId,
  uid: mongoose.Schema.Types.ObjectId,
  rating: Number,
  service: String,
  description: String,
});

const Reviews = mongoose.model("reviews", reviewsSchema);




module.exports = { Usersdata, Buisnessdata, Appointments, Reviews };
// module.exports=Usersdata

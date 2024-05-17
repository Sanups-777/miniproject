const mongoose = require("mongoose");

const udetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  phno: String,
  password: { type: String, required: true },
});

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
});

const Appointments = mongoose.model("appointments", apdetailSchema);

module.exports = { Usersdata, Buisnessdata, Appointments };
// module.exports=Usersdata

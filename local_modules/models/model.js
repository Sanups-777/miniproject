const mongoose = require("mongoose");

const udetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: String,
  phno: String,
  password: String,
});

const Usersdata = mongoose.model("users", udetailSchema);

const bdetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  services: [String],
});

const Buisnessdata = mongoose.model("business-ls", bdetailSchema);

module.exports = { Usersdata, Buisnessdata };
// module.exports=Usersdata;

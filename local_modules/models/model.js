const mongoose = require("mongoose");
const { isEmail } = require('validator');

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
});

const Buisnessdata = mongoose.model("business-ls", bdetailSchema);


module.exports = { Buisnessdata};

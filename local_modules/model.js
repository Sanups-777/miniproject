const mongoose = require('mongoose');

const udetailSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    email: String,
    phno: String
});

const Usersdata = mongoose.model('users', udetailSchema);

const bdetailSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String,
    services:Array,
});

const Buisnessdata = mongoose.model('buisness-L', bdetailSchema);

module.exports = { Usersdata, Buisnessdata };
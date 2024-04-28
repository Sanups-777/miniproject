const mongoose = require('mongoose');

const udetailSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    email: String,
    phno: String
});

const Usersdata = mongoose.model('users', udetailSchema);

module.exports = Usersdata;

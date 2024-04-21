const express = require('express');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const router = express.Router();

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}

const udetailSchema = new mongoose.Schema({
  id:ObjectId,
  name: String,
  username: String,
  email: String,
  phno: String
});

const Usersdata = mongoose.model('users', udetailSchema);

router.get('/details', (req, res) => {
  Usersdata.find({})
    .then((data) => {
      res.render('details', {
        userlist: data
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.post("/remuser", async (req, res) => {
  
    var name = req.body.nrem;
    var result;
    try {
    result = await db.collection("users").findOne({ username: name });
    } catch (err) {
    console.log("User does not exist");
    }
    console.log(result);

    db.collection("users").deleteOne({ username: name });
    console.log("user deleted");
    let a = "Admin";
    res.render("adminp", {
    name: a,
    });
});

module.exports = { init, router };
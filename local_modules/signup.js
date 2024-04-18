let mongooseConnection;
function init(db) {
  mongooseConnection = db;
}

const express = require('express');
const router = express.Router();

router.post("/buisness", (req, res) => {
  
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;
  var data = {name: name, username: username, email: email, phno: phno, password: password,};
  db.collection("business-L").insertOne(data, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Record Inserted Successfully:", result.insertedId);
    res.redirect("login.html"); 
  });
});
router.post("/users", (req, res) => {
  
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var data = {name: name, username: username, email: email, phno: phno, password: password,};
    db.collection("users").insertOne(data, (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("Record Inserted Successfully:", result.insertedId);
      res.redirect("login.html"); 
    });
});

module.exports = { init, router };
let mongooseConnection;
function init(db) {
  mongooseConnection = db;
}

const express = require('express');
const router = express.Router();

router.post("/reset_pass", async (req, res) => {
  
    var email = req.body.email_reset;
    var original_password = req.body.original_password_reset;
    var new_password = req.body.new_password_reset;
    try {
        var result = await db.collection("users").findOne({ email: email });
      } catch (err) {
        console.log("User does not exist");
      }
    console.log(result);
  
    if (result) {
      if (result.password === original_password) {
        db.collection("users").updateOne({ email: email },
            { $set: { password: new_password } });
  
        return res.redirect("login.html");
      } else {
        console.log("INVALID USERNAME OR PASSWORD");
      }
    } else {
      console.log("INVALID USERNAME OR PASSWORD");
    }
});



module.exports = { init, router };
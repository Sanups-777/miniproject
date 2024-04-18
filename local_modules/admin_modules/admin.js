let mongooseConnection;
function init(db) {
  mongooseConnection = db;
}

const express = require('express');
const router = express.Router();



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
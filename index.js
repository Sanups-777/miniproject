const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {body,validationResult} = require('express-validator');
const app = express();

// Set the view engine to use EJS
app.set("view engine", "ejs");

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "images" directory under "/images" path
app.use("/images", express.static("images"));

// Import local modules
const login = require("./local_modules/login.js");
const signup = require("./local_modules/signup.js");
const admin = require("./local_modules/admin_modules/admin.js");
const users = require("./local_modules/user_modules/user.js");
const html = require("./local_modules/html.js");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mongodb:gr74mongo@cluster0.mg8xlkx.mongodb.net/userdata",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    const db = mongoose.connection;
    login.init(db); // Pass the MongoDB connection to login module
    signup.init(db);
    admin.init(db);
    users.init(db);
    //details.init(db);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/mainpage.html");
});

app.post('/submit',[
  body('name')
  .trim()
  .notEmpty()
  .withMessage("Please enter the name"),
  body('username')
  .trim()
  .notEmpty()
  .withMessage("Please enter username"),
  body('email')
  .trim()
  .notEmpty()
  .withMessage("Please enter the email"),
  body('phno')
  .trim()
  .notEmpty()
  .withMessage("Please enter the phone number"),
  body('password')
  .trim()
  .notEmpty()
  .withMessage("Please enter the password"),
  body('conpassword')
  .trim()
  .notEmpty()
  .withMessage("Please enter the password again"),
],
(req,res)=>{
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(422).json({errors:errors.array()})
  }

  res.status(200).json({msg:"Form is validated"})
})


// Mount routes
app.use("/login", login.router);
app.use("/signup", signup.router);
app.use("/admin", admin.router);
app.use("/users", users.router);
app.use('/homesaver', html.router);

// Start the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

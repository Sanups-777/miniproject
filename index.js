const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const QRCode = require('qrcode');

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
const login = require("./local_modules/authentication_modules/login.js");
const signup = require("./local_modules/authentication_modules/signup.js");
const admin = require("./local_modules/admin_modules/admin.js");
const users = require("./local_modules/user_modules/user.js");
const routes = require("./local_modules/routes/routes.js");
const search = require("./local_modules/search/search.js");
const booking = require("./local_modules/appointments/appointments.js");
// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mongodb:gr74mongo@cluster0.mg8xlkx.mongodb.net/userdata",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define routes
app.get("/", (req, res) => {
  res.render("webpages/index");
});

// Mount routes
app.use("/login", login.router);
app.use("/signup", signup.router);
app.use("/admin", admin.router);
app.use("/users", users.router);
app.use("/homesaver", routes.router);
app.use("/search", search.router);
app.use("/appointments", booking.router);
// Start the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

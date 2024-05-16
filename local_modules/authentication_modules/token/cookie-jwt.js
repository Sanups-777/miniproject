const express = require("express");
const cookie = express.Router();
const cookie_Parser = require('cookie-parser');
cookie.use(cookie_Parser());


const maxAge =3 * 24 * 60 *60;
const createToken = (id) =>{
  return jwt.sign({id}, 'net ninja secret', {
    expiresIn: maxAge
  });
}


module.exports={createToken}
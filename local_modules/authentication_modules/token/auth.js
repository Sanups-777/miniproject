const jwt = require('jsonwebtoken');
const { Usersdata } = require('../../models/user_models');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;
  
  if (token) { 
    // console.log("jwt is",jwt);
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkuser=(req,res,next)=>{
  const token = req.cookies.jwt;
  
  if (token) { 
    console.log("jwt is",jwt);
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user=null;
        next();
      } else {
        console.log(decodedToken);
        let user=await Usersdata.findById(decodedToken.id);
        res.locals.user=user;
        next();
      }
    });
  } else {
    res.locals.user=null;
    next()
  }
}

module.exports = { requireAuth,checkuser };

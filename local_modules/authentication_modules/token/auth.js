const jwt = require('jsonwebtoken');
const { Usersdata } = require('../../models/user_models');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;
  
  if (token) { 
    // console.log("jwt is",jwt);
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        //console.log(err.message);
        res.redirect("/homesaver/login");
      } else {
        //console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/homesaver/login");
  }
};

const checkuser=(req,res,next)=>{
const token = req.cookies.jwt;
  
  if (token) { 
    //console.log("jwt is",jwt);
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        
        res.locals.user=null;
        next();
      } else {
        //console.log(decodedToken);
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

const checkbusiness=(req,res,next)=>{
  const token = req.cookies.jwt;
    
    if (token) { 
      //console.log("jwt is",jwt);
      jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
          
          res.locals.buisness=null;
          next();
        } else {
          //console.log(decodedToken);
          let buisness=await Usersdata.findById(decodedToken.id);
          res.locals.buisness=buisness;
          next();
        }
      });
    } else {
      res.locals.buisness=null;
      next()
    }
  }
module.exports = { requireAuth,checkuser,checkbusiness };

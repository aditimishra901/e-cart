const jwt = require("jsonwebtoken");

const User = require("../model/usermodel.js");



module.exports = function(req,res,next){
     const token = req.header("auth-token");
     if(!token){res.status(401).send("access denied");
   }
   else {
     const verified = jwt.verify(token, process.env.ACCESS_SECRET);
    const userId = verified.userId;
     if(verified)
     {
User.findOne({
  _id:verified.id
},function(err,user){
  req.user = user;
res.locals.user = user;
next();

});


   }
   else {
       res.status(401).send("invalid token,PLease login to access it");
     }
   }
}

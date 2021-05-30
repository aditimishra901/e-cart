const jwt = require("jsonwebtoken");
module.exports = function(req,res,next){
     const token = req.header("auth-token");
     if(!token){res.status(401).send("access denied");
   }
   else {
     const verified = jwt.verify(token, process.env.ACCESS_SECRET);
     if(verified)
     {

     req.user = verified;


      next();
   }
   else {
       res.status(401).send("invalid token,PLease login to access it");
     }
   }
}

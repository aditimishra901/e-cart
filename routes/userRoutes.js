const router =require("express").Router();
const User = require("../model/usermodel.js");
const data = require("../data.js");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { registervalidation } = require("../validation.js");

const {loginvalidation} = require("../validation.js");

router.post("/signup",function(req,res){

//validation

const {error} = registervalidation(req.body);
if(error){res.status(400).send(error.details[0].message);}
else{
       User.findOne({email:req.body.email},function(err,emailExists){

    if(emailExists){
      res.send("email already exists please check");

    }

    else {

      const hashPass = Bcrypt.hashSync(req.body.password,10);

       const user = new User({
         name:req.body.name,
         email:req.body.email,
         password:hashPass
       });

       user.save(function(err){
         if(err){res.status(400).send(err);}
         else{res.send(user);}
       })

    }
       });
}
});



//LOGIN

router.post("/login",function(req,res){
   const {error} = loginvalidation(req.body);
   if(error){
     res.status(400).send(error.details[0].message);
   }
   else{
     User.findOne({email:req.body.email},function(err,results){
        if(results){
          Bcrypt.compare(req.body.password,results.password,function(err,foundPass){
            if(foundPass){
                 //assigning a token
               const token = jwt.sign({name:results.name},process.env.ACCESS_SECRET)

                res.header("auth-token",token).json(
                  {
                    "access token":token,
                    "user_id":results._id
                  }
                );


            }
            else{res.send("wrong password");}
          });
        }
       else{
         res.send("email not found");
       }
     });
   }
});

module.exports = router;

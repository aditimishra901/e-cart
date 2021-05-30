const router = require("express").Router();
const Product = require("../model/productsmodel.js");
const data = require("../data");
const Cart = require("../model/cart.js");
const verify= require("./verifytoken.js");
var quantity =0;
const mongoose = require("mongoose");
const User = require("../model/usermodel.js");

router.get("/",function(req,res){
   Product.insertMany(data.products);
   res.send(data.products);
});

router.get("/all",function(req,res){
    Product.find(function(err,result){
       if(!err){res.json(result);}
       else{res.status(400).send(err);}
    }).populate("user","name");
});

router.post("/upload",verify,function(req,res){
  
  const product = new Product({
    _id:mongoose.Types.ObjectId(),
    category:req.body.category,
     genre :req.body.genre,
   name:req.body.name,
    author:req.body.author,
     user:req.body.user,
      price:req.body.price,
       review:req.body.review

  });
  User.findById(req.body.user,function(error,idExists){
     if(!error){

       product.save(function(err,itemUploaded){
         if(!err){

              res.status(200).send(itemUploaded);
         }

          else {
            res.status(400).send(err);     }
       });
     }
     else{
       res.status(400).send(error);
     }

  });


});





router.post("/:genre",function(req,res){

 Product.find({

   genre:req.params.genre


 },function(error,foundMatch){

   if(foundMatch)
   {
     console.log(foundMatch);
      res.json(foundMatch);

   }
   else{res.status(400).send( " books of this category are not there");}

 }).populate("user","name");



});

module.exports= router;

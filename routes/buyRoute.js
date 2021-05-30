const router = require("express").Router();
const verify = require("./verifytoken.js");
const data = require("../data.js");
const Order = require("../model/cart.js");
const Product = require("../model/productsmodel.js");
const User = require("../model/usermodel.js");
 const mongoose = require("mongoose");



router.get("/showCart",function(req,res){
   Order.find(function(err,result){

   }).populate("")

});



router.post("/cart", verify, function(req,res){

      const order = new Order({
        _id:mongoose.Types.ObjectId(),
      
        product:req.body.product,
          quantity:req.body.quantity
      });



           Product.findById(req.body.product,function(error,productExists){
             if(productExists){

                 order.save(function(e,orderAdded){
                   if(!e){res.status(200).send(orderAdded);}
                   else{res.send(e);}
                 });

             }
             else {
               res.status(400).send("product does not exists");
              }

           });




});


module.exports = router;

const router = require("express").Router();
const verify = require("./verifytoken.js");
const data = require("../data.js");
const Order = require("../model/cart.js");
const Product = require("../model/productsmodel.js");
const User = require("../model/usermodel.js");
 const mongoose = require("mongoose");



router.get("/showCart",verify,function(req,res){
   Order.find(function(err,result){

   }).populate("")

});



router.post("/cart", verify, function(req,res){
     // const userId =  req.body.user;
    const cart = new Order({
      productId:req.body.productId,
      quantity:req.body.quantity
    });
  let user = req.user;
Order.find(req.user,function(err,cart){
  if(cart){
    let itemIndex = cart.products.findIndex(p=> p.productId === productId);
     if(itemIndex>-1){
       let productItem =  cart.products[itemIndex];
       productItem.quantity = quantity;
       cart.products[itemIndex] = productItem;

     }
     else {
       cart.products.push({ productId, quantity});

     }

     cart.save(function(error,cart){
       if(!error){
         res.status(200).send(cart);

       }
       else

         res.send(error);

     }).populate("products");



  }
  else {
    res.json({
      error:err,
      message:"user not logged in"
    });
  }
});

});


module.exports = router;

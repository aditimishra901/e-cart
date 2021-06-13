const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({


   user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     // required:true
   },
   products:[
     {
      productId:{ type:mongoose.Schema.Types.ObjectId,
       ref:'Product',
       required:true},
       quantity:{type:Number,default:1},



     }
   ],
   active: {
       type: Boolean,
       default: true
     },
     modifiedOn: {
       type: Date,
       default: Date.now
     }


});

module.exports = mongoose.model("Order", orderSchema);

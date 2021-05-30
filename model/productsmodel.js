const mongoose = require("mongoose");

const productSchema =mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category:"String",
  genre:"String",
  name:{type:"String",required:true, unique:true},
  author:{type:"String",required:true},
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
   price:{type:"Number"},
   review:"String"

});

module.exports = mongoose.model("Product", productSchema);


// required:true, unique:true

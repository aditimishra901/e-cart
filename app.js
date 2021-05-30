const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes.js");
const productRoute = require("./routes/productsRoutes.js");
const buyRoute = require("./routes/buyRoute.js");
const app = express();

mongoose.connect("mongodb://localhost:27017/ecom2DB",{useNewUrlParser:true,useUnifiedTopology: true});

//middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

//ROUTE middlewares

app.use("/api/ecom2/user/",userRoute);
app.use("/api/ecom2/products/",productRoute);
app.use("/api/ecom2/buy/",buyRoute);

app.listen(3000,function(req,res){

 console.log("server running at port 3000");

});

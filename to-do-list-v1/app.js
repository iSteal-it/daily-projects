const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
var items =[];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set("view engine" , "ejs");

app.get("/",function(req,res){
let day = date.getDate();
console.log(date.b)
  res.render("list" , {kindOfDay:day, item:items});
});

app.post("/", function(req,res){
  var item = req.body.item

  items.push(item)
  res.redirect("/")
});

app.listen("3000", function(){
  console.log("server started at port 3000")
});

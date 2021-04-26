const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine" , "ejs");

app.get("/", function(req,res){

  res.render("index");
});
app.post("/", function(req,res){
  var num = Math.floor(Math.random() * 3);

  var choice = parseInt(req.body.button)
  console.log(num , choice)
  var ans =""
  if (choice === num) {
    ans = "You won"
  } else {
    ans = "You lose"
  }
  res.render("answer" , {ans:ans})
})
app.post("/ans" , function(req,res){
  res.render("index")
})
app.listen(3000, function(){
  console.log("Server is running in port 3000")
});

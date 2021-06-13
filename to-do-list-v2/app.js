//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash")
const app = express();

app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema ({
  name:String,
})

const Item = mongoose.model("Item", itemSchema)

var cook = new Item ({
  name:"cook"
});

var eat = new Item ({
  name:"eat"
});

var kill = new Item ({
  name:"kill"
});

const defaultArray = [cook,eat,kill];





app.get("/", function(req, res) {

const day = date.getDate();

Item.find(function(err,results){

  if (results.length === 0){
    Item.insertMany(defaultArray,function(err){
      if (err) {
        console.log(err)
      } else {
        console.log("sucess")
      }
    })
  }
  if (err) {
    console.log(err)
  } else {
    res.render("list", {listTitle: "Today", newListItems: results});

  }
})


});

app.post("/delete", function(req,res){
  const chk = req.body.checkbox
  const listN = req.body.listN



if (listN === "Today") {
  Item.findByIdAndRemove(chk, function(err){
    if (!err) {
      res.redirect("/")
    }
  })
} else {
  list.findOneAndUpdate({name:listN},{$pull:{items:{_id:chk}}}, function(err,result){
    if(!err) {
      res.redirect("/" + listN)
    }
  })
}




})
app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item ({
    name:itemName
  })

  if (listName==="Today") {
    item.save()
    res.redirect("/")
  } else {
    list.findOne({name:listName}, function(err,foundList){
      foundList.items.push(item)
      foundList.save()
      res.redirect("/" + listName)
    })
  }
});

const listSchema = new mongoose.Schema({
  name:String,
  items:[itemSchema]
})

const list = mongoose.model("list", listSchema)


app.get("/:paramName" , function(req,res){

  const r = _.capitalize(req.params.paramName)
list.find({name:r},function(err,result){
if(result.length===1){
  const day = date.getDate();

  res.render("list",{listTitle: r, newListItems: result[0].items})
} else {
  const work = new list ({

    name:r,
    items:defaultArray
  }
)
  work.save()
const day = date.getDate();
    res.render("list",{listTitle: r, newListItems: work.items})
}
})

})




app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

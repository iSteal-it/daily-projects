const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
  title: String,
  cont: String
})
const Article = mongoose.model("Article", articleSchema)


app.route("/articles")
.get(function(req, res) {
  Article.find(function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
.post(function(req, res) {
  console.log(req.body.title)
  console.log(req.body.cont)

  const newArticle = new Article({
    title: req.body.title,
    cont: req.body.cont
  })

  newArticle.save(function(err) {
    if (!err) {
      res.send("sucessfully added")
      newArticle.save()
    } else {
      res.send(err)
    }
  })

})
.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err) {
      res.send("deleted")
    } else {
      res.send(err)
    }
  })

})


app.route("/articles/:articleTitle")

.get(function(req,res){

  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(!err){
      res.send(foundArticle)
    } else {
      res.send(err)
    }
  })
})

.put(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title,cont:req.body.cont},
    {overwrite:true},
    function(err){
      if(err){
        console.log(err)
      } else {
        res.send("done")
      }
    }
  )
})

.patch(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {$set:req.body},
    function(err,result){
      if(err){
        console.log(err)
      } else {
        res.send("done")
      }
    }
  )
})

.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if (err){
        res.send(err)
      }else {
        res.send("done")
      }
    }

  )

})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

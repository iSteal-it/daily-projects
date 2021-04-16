const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
  var coin = req.body.coin
  var currency = req.body.currency
  var button = req.body.button
if (button === "go"){
      const url = "https://api.coingecko.com/api/v3/simple/price?ids=" + coin + "&vs_currencies=" + currency + "&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false"
      https.get(url, function(response){
        response.on("data", function(data){

          var info= JSON.parse(data);
          var price =info[coin][currency].toString()
          res.send(price)
        });
      });
    };
if (button == "coins"){
  res.send("1")
};

if (button == "currency"){
    const url2 = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
    https.get(url2,function(response){
      response.on("data", function(data){
      var info = JSON.parse(data);
      var w = info[0]

        // var currencyes = info.length
        // for (i=0;i<currencyes;i++){
        //   res.write(currencyes[i])
        // };
        res.send("1")
      });
    });
};

});


app.listen(3000, function(){
  console.log("server started at port 3000")
});

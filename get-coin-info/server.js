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
      const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + currency +"&ids="+ coin + "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      https.get(url, function(response){
        var fulldata = ""
        response.on("data", function(chunks){
          fulldata += chunks
          });
          response.on("end", function(){
            var info= JSON.parse(fulldata);


            res.write("name:" +info[0].name + " \n")
            res.write("symbol:" +info[0].symbol + " \n")
            res.write("current price:" +info[0].current_price + " " + currency+" \n")
            res.write("market cap:" +info[0].market_cap +" "+currency + " \n")
            res.write("market cap rank:" +info[0].market_cap_rank + " \n")
            res.write("fully diluted valuation:" +info[0].fully_diluted_valuation + " " + currency+ " \n")
            res.write("total volume:" +info[0].total_volume + " " + currency + " \n")
            res.write("high 24 hrs:" +info[0].high_24h + " " + currency + " \n")
            res.write("low 24 hrs:" +info[0].low_24h + " " + currency+ " \n")
            res.write("price change in 24 hrs:" +info[0].price_change_24h + " " + currency + " \n")
            res.write("circulating supply:" +info[0].circulating_supply + " " + " \n")
            res.write("total supply:" +info[0].total_supply + " " + "\n")
            res.write("All time high:" +info[0].ath + " " + currency + " \n")
            
            res.send()
          })
      });
    };
if (button == "coins"){
  const url1 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  https.get(url1, function(response){
    var fulldata = ""
    response.on("data", function(chunks){
      fulldata += chunks;
    });
    response.on("end", function(){
      var arry = JSON.parse(fulldata)

      for (i=0;i<arry.length;i++){
        res.write(arry[i].id + " \n")
      }
      res.send()
    })
  });
};

if (button == "currency"){
    const url2 = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies/"
    var fulldata = ""
    https.get(url2 , function(response){
      response.on("data", function(chunks){
        fulldata += chunks
          })
      response.on("end", function(){
        var arry = JSON.parse(fulldata)
        for (i=0;i<arry.length;i++){
          res.write(arry[i] + " \n")
        }
          res.send()
      })

    });
};

});


app.listen(3000, function(){
  console.log("server started at port 3000")
});

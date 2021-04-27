const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.get("/", function(req,res){

var date = new Date();
var date = String(date);
var splitDate = date.split(" ");
var day = splitDate[0];
var month = splitDate[1];
var year = splitDate[3]
var time = splitDate [4]
var splittime = time.split(":")
var hours = splittime[0]
var minutes = splittime[1]
var seconds = splittime[2]
var date = day + " " + month + " " + splitDate[2] + " " + year
var time = hours + ":" + minutes

  res.render("index" , {date:date,time:time});

});

app.post("/", function(req,res){
  var currencyUrl = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  var choice = req.body.button

  if (choice === "2") {
    https.get(currencyUrl,function(response){
      var fullData = ""
      response.on("data", function(chunks){
        fullData += chunks
      });
      response.on("end",function(){
        var datas = JSON.parse(fullData)
        for (i=0;i<datas.length;i++){
          res.write(datas[i] + " \n");
        }
        res.send();
      });
    });
  };

  if (choice === "1") {
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

  if (choice === "3") {
    var date = new Date();
    var date = String(date);
    var splitDate = date.split(" ");
    var day = splitDate[0];
    var month = splitDate[1];
    var year = splitDate[3]
    var time = splitDate [4]
    var splittime = time.split(":")
    var hours = splittime[0]
    var minutes = splittime[1]
    var seconds = splittime[2]
    var date = day + " " + month + " " + splitDate[2] + " " + year
    var time = hours + ":" + minutes + ":" + seconds
    var show = date + " " + time
    var coin = req.body.coin
    var currency = req.body.currency
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + currency +"&ids="+ coin + "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    https.get(url, function(response){
      var fulldata = ""
      response.on("data", function(chunks){
        fulldata += chunks
        });
        response.on("end", function(){
          var info= JSON.parse(fulldata);
          var name = info[0].name
          var symbol = info[0].symbol
          var current_price = info[0].current_price
          var market_cap = info[0].market_cap
          var market_cap_rank = info[0].market_cap_rank
          var fully_diluted_valuation = info[0].fully_diluted_valuation
          var total_volume = info[0].total_volume
          var high_24h = info[0].high_24h
          var low_24h = info[0].low_24h
          var price_change_24h = info[0].price_change_24h
          var circulating_supply = info[0].circulating_supply
          var total_supply = info[0].total_supply
          var ath = info[0].ath

          res.render("result", {time:show,name:name,symbol:symbol,current_price:current_price,market_cap:market_cap,market_cap_rank:market_cap_rank,

          fully_diluted_valuation:fully_diluted_valuation,total_volume:total_volume,high_24h:high_24h,low_24h:low_24h,
        price_change_24h:price_change_24h,circulating_supply:circulating_supply,total_supply:total_supply,ath:ath,currency,currency})
        })
    });
  };
});

app.listen(3000 , function(){
  console.log("server started at port 3000");
});

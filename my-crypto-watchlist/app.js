const express = require("express");
const app = express();
const https = require("https");
const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ankr,cardano,polkadot,cosmos&vs_currencies=gbp"

app.get("/",function(req,res){
  https.get(url, function(response){
    response.on("data" , function(data){
      var got = data;
      var dic = JSON.parse(got)
      var bitcoin = dic.bitcoin.gbp
      var atom = dic.cosmos.gbp
      var ada = dic.cardano.gbp
      var polkadot = dic.polkadot.gbp
      var ankr = dic.ankr.gbp
      res.write("<h1> bitcoin:" + bitcoin + "</h1>")
      res.write("<h1> ada:" + ada + "</h1>")
      res.write("<h1> atom:" + atom + "</h1>")
      res.write("<h1> polkadot:" + polkadot + "</h1>")
      res.write("<h1> ankr:" + ankr + "</h1>")
      res.send()
    })
  })

})

app.listen(3000 , function(){
  console.log("server running in port 3000")
});

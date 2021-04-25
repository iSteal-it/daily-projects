const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/" , function(req,res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res) {
  var name = req.body.name
  var email = req.body.email
  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:name
        }
      }
    ]
  };
  var jsonD = JSON.stringify(data);
  const url ="https://us1.api.mailchimp.com/3.0/lists/f8ce88aeb7"
  const options = {
    method:"POST",
    auth:"kim:ef5f95452d7e357cd183866c8148de52-us1"
  }
const request =  https.request(url,options,function(response){
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.send(__dirname + "/failure.html")
  }
   response.on("data",function(data){
     console.log(JSON.parse(data))
   })
  })
  request.write(jsonD)
  request.end()

})
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running")
})

// api = ef5f95452d7e357cd183866c8148de52-us1
// f8ce88aeb7

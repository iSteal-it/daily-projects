module.exports.getDate= getDate

function getDate(){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  var day = today.toLocaleDateString("en-US", options);
  return day
}

var b = 3
module.exports.b = b;

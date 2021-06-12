const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
//
const fruitSchema = new mongoose.Schema (
  {
    name: {
      type:String,
      required:true
    },
    rating: {
      type:Number,
      min:1,
      max:10
    },
    review: String
  }
);

const Fruit = mongoose.model("Fruit", fruitSchema);

// const Orange = new Fruit({
//   name:"orange",
//   rating:8,
//   review:"good"
// })
//
// const Kiwi = new Fruit({
//   name:"Kiwi",
//   rating:9,
//   review:"good"
// })

// Fruit.insertMany([Kiwi,Orange], function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("done")
//   }
// })


// const Apple = new Fruit ({
//   name: "Apple",
//   rating: 7,
//   review:"good"
// })
//
// Apple.save()

mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const peopleSchema = new mongoose.Schema ({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
})

const People = mongoose.model("People", peopleSchema);

const pineapple = new Fruit ({
  name:"Pineapple",
  rating:9,
  review:"good"
})

// pineapple.save()
const person = new People ({
  name:"Amy",
  age:12,
  favouriteFruit:pineapple
})

person.save()
//
// const Peoples = new People ({
//   name:"john",
//   age:20
// });
//
// Peoples.save()

// Fruit.updateOne({_id:"60c45ed6e679bc0626a9cce0"}, {name:"Peach"}, function(err){
//   if (err) {
//     console.log(err)
//   }else {
//     console.log("done")
//   }
// })
//
// Fruit.deleteOne({name :"Peach"}, function(err){
//   console.log(err)
// });
//
//
// Fruit.find(function(err, fruits){
//   if (err) {
//     console.log(err)
//   } else {
//
//     fruits.forEach(function(fruit){
//       console.log(fruit.name)
//     })
//   }
// })

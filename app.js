const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors'); // to avoid all core problems

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.use(cors());

mongoose.connect("mongodb://localhost:27017/INSTA_DEF_DB",{useNewUrlParser: true, useUnifiedTopology: true});

// const todoSchema = mongoose.Schema({
//    title:String,
//    content: String
// });

// const Todo = mongoose.model("Todo", todoSchema); 

app.route("/")
.get((req, res)=>{
   res.send("Hello");
})
.post((req, res)=>{
   console.log(req.body);
   res.send(req.body);
});


app.listen(5000, function() {
  console.log("Server started on port 5000...!!!");
});
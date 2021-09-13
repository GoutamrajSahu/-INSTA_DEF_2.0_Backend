const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors'); // to avoid all core problems
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(cors());

app.use(session({
  secret:"Secret will be secret when we don't expose it.",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/INSTA_DEF_DB",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const todoSchema = mongoose.Schema({
//    title:String,
//    content: String
// });

// const Todo = mongoose.model("Todo", todoSchema); 

app.route("/")
.get((req, res)=>{
   res.send("Hello");
})

app.route("/signup")
.post((req, res)=>{
   
  User.register({username: req.body.email}, req.body.password, (err,user)=>{
   if(err){
     res.send(false);
   }else{
     res.send(true);
   }
  });
  //  console.log("signUpData: ");
  //  console.log(req.body);
  //  res.send(req.body);
});

app.route("/login")
.post((req, res)=>{

  // console.log("loginData: ")
  //  console.log(req.body);
  //  res.send(req.body);
});







app.listen(5000, function() {
  console.log("Server started on port 5000...!!!");
});
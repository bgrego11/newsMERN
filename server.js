var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');

var request = require('request');
var cheerio = require('cheerio');
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
// import User from "./models/User.js";
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

//Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
// app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database configuration with mongoose
mongoose.connect("mongodb://heroku_ttdcg5mp:6gplnkdrpbmv3ou7pqsjj1qd47@ds161890.mlab.com:61890/heroku_ttdcg5mp");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



var PORT = process.env.PORT || 3000;





   


app.get('/api/saved', function(req,res){
    Article.find({}).then(function(data) {
        res.json(data)
    });
})

app.post('/api/saved', function (req, res) {
    data = req.body;
    art = new Article({
        link: data.link,
        title: data.title,
        date: data.date,
    });
    art.save( function(err,res){
            if (err) {
                console.log("cannot save")
            }
            else {
                res.json(art)
            }
        })    
});

 

app.delete('/api/saved', function(req,res){
    Article.find({
        id: req.body.id,
    }).remove(function(){
        res.json({"msg": "article deleted"})
    })
        
    
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function() {
  console.log("App running on port 3000!");
});

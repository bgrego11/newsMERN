var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");



// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
// import User from "./models/User.js";
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

//Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Make public a static dir
// app.use(express.static("public"));

app.use(express.static("./public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_lpl136dc:r35k2gmredptdgn6cdgclavo7g@ds129031.mlab.com:29031/heroku_lpl136dc");
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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function() {
  console.log("App running on port 3000!");
});

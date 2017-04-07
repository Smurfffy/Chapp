// all the dependencies needed for the server.
var express  = require('express');
var app      = express();                        // create our app with express
var mongoose = require('mongoose');             // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console
var bodyParser = require('body-parser');    // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT
var cors = require('cors');

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://fyp:hZKoGKQDOdtPw2jCTFgKmDIQKyEv7KNSH4SjRXZwidFDWoKTC47Z9MS3qv2RuzD0Ft0YgKzD6mf0LIIbKBvqhw==@fyp.documents.azure.com:10250/?ssl=true", function (err, db) {
  db.close();
});

//====================================================================================================
// Configuration
mongoose.connect('mongodb://localhost/review-king');
mongoose.connect('mongodb://fyp:hZKoGKQDOdtPw2jCTFgKmDIQKyEv7KNSH4SjRXZwidFDWoKTC47Z9MS3qv2RuzD0Ft0YgKzD6mf0LIIbKBvqhw==@fyp.documents.azure.com:10250/?ssl=true');


 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number
});
 
// Routes
 
    // Get reviews
    app.get('/api/reviews', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Review.find(function(err, reviews) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(reviews); // return all reviews in JSON format
        });
    });
 
    // create review and send back all reviews after creation
    app.post('/api/reviews', function(req, res) {
 
        console.log("creating review");
 
        // create a review, information comes from request from Ionic
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });
 
    });
 
    // delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {
 
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
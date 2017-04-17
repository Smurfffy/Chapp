var express  = require('express');
var app      = express(); // This creates our app with express, this helps it get hosted online
var morgan = require('morgan'); // This imports morgan to our server which logs requests to the console.
var bodyParser = require('body-parser');    //This imports body-parser which pulls information from HTML POST 
var methodOverride = require('method-override'); //This importes method-override into our project to  simulate DELETE and PUT
var cors = require('cors'); // This imports cors into our project

// Our MongoDB dabase is imported to our node serve here.
var mongoose = require('mongoose'),
    mongoClient = mongoose.mongoClient,
    ObjectID = mongoose.ObjectID,
    db;
 
// Configuration
// Below was for our originall local connection
//mongoose.connect('mongodb://localhost/reviews');

//Below we connect our mLabs database to our node server
mongoose.connect('mongodb://jason:Finalyear17@ds145780.mlab.com:45780/heroku_tmdt9wp4');
 
app.use(morgan('dev')); // This log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json for sending between the app and the database
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json for sending and retrieving data from the app
app.use(methodOverride());
//app.set('port', process.env.PORT || 8080); // This is for connecting the app to heroku
app.use(cors());
app.use(express.static("www")); // Our Ionic app build is in the www folder and is got by the server so it can run on heroku.

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Tells the app which port to listen on. 
app.listen(8080);
console.log("App listening on port 8080");
 
// Model for the reviews in our app
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

        // get and return all the reviews after another is created
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

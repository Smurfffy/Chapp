// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express                    // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

var mongoose = require('mongoose'),
    mongoClient = mongoose.mongoClient,
    ObjectID = mongoose.ObjectID,
    db;
 
// Configuration
//mongoose.connect('mongodb://localhost/reviewking');
mongoose.connect('mongodb://jason:Finalyear17@ds145780.mlab.com:45780/heroku_tmdt9wp4');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//app.set('port', process.env.PORT || 8080); // This is for connecting the app to heroku
app.use(cors());
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')
 
//var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://jason:Finalyear17@ds145780.mlab.com:45780/heroku_tmdt9wp4';

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
 
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

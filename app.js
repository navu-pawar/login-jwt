var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
app.use(express.json({limit: '50mb'}));

// connect to Mongo when the app initializes
var config = require(__dirname + '/config/config');
mongoose.connect(config.db.uri);


app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Include the route files
app.use(config.apiUserPath, require("./app/routes/users"));

app.listen(process.env.PORT || 5500)
if (process.env.PORT === undefined) {
    console.log("Server Started at port : " + config.serverName + ":" + 5500);
} else {
    console.log("Server Started at port " + config.serverName + ":" + process.env.PORT);
}
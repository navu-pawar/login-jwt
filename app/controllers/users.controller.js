(function () {
    "use strict";
    var generator = require('generate-password');
    var passwordHash = require('password-hash');
    var jwt = require('jsonwebtoken');
    var config = require(__dirname + '/../../config/config');
    var User = require('../models/users.model');
    var userHelper = {};
    var selectedFields = {
        "email": 1,
        "firstname": 1,
        "lastname": 1
    };
// signUp
    userHelper.signUp = function (req, res) {
        var userEmailAddress = (req.body.email).toLowerCase();
        userHelper.isEmailExist(userEmailAddress).then(function (emailResponse) {
            if (emailResponse.exist == true) {
                res.status(400).send(JSON.stringify({"status": false, "error": 'Email Address (' + userEmailAddress + ') already exist.'}));
            } else {
                var hashedPassword = passwordHash.generate(req.body.password);
                new User({
                    email: userEmailAddress,
                    password: hashedPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }).save(function (error, userResponse) {
                    if (error) {
                        res.status(400).send(JSON.stringify({"status": false, "error": error}));
                    } else {
                        var token = jwt.sign({email: req.body.email}, config.secret, {expiresIn: '24h'});
                        res.status(200).send(JSON.stringify({status: true, "userData": userResponse, "access_token": token}));
                    }
                });
            }
        });
    }
// signUp-ends

// signIn
    userHelper.signIn = function (req, res) {
         var userEmailAddress = (req.body.email).toLowerCase();
        User.findOne({email: userEmailAddress}, function (error, user) {
            if (error) {
                throw error;
            }else if (!user) {
                res.status(403).send(JSON.stringify({status: false, error: 'Authentication failed. User not found.'}));
            } else if (user) {
                var checkPassword = passwordHash.verify(req.body.password, user.password);
                if (checkPassword !== true) {
                    res.status(403).send(JSON.stringify({status: false, error: 'Authentication failed. Wrong password.'}));
                } else {
                    var token = jwt.sign({email: userEmailAddress}, config.secret, {expiresIn: '24h'});
                    res.status(200).send(JSON.stringify({status: true, "data": req.body, "access_token": token}));
                }
            }
        });
    };

// signIn ends

// userInfo
    userHelper.getUserInfo = function (req, res) {
        var email = req.decoded.email;
        userHelper.isEmailExist(email).then(function (userResponse) {
            if (userResponse.exist == true) {
                res.status(200).send(userResponse.data);
            } else {
                res.status(400).send(JSON.stringify({"status": false, "error": 'User does not exist'}));
            }
        });
    };

// userInfo ends

// check if email exist
    userHelper.isEmailExist = function (email) {
        return new Promise(function (resolve, reject) {
            User.find({'email': email},selectedFields, function (err, response) {
                if (response.length > 0) {
                    resolve({exist: true, data: response[0]});
                } else {
                    resolve({exist: false, data: response[0]});
                }
            });
        });
    };

//test-call
    userHelper.testUser = function (req, res) {
        res.status(200).send(JSON.stringify({success: true, "data": "User Route tested"}));
    }

    module.exports = userHelper;
})();
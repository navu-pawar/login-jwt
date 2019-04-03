var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Include Controllers
var userController = require('../controllers/users.controller');
var config = require(__dirname + '/../../config/config');





var authMiddleware = function (req, res, next) {
    var token = req.body.access_token || req.query.access_token || req.headers.access_token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            console.log(decoded, 'decoded');
            if (err) {
                return res.status(403).json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, error: 'No token provided.'});

    }
}

//Users
router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.get('/userInfo', authMiddleware, userController.getUserInfo);


module.exports = router;

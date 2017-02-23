var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var sanitizerPlugin = require('mongoose-sanitizer');


// The Schema
var UserSchema = new mongoose.Schema({
    name: String,
    user: String,
    pass: {
      type: String,
      select: false,
    },
    rol: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    }
});
UserSchema.plugin(sanitizerPlugin);

// The connection
var User = mongoose.model('User', UserSchema);

// Check token
decode = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // We won't have decoded info
        next();
    }
};

// Login handler
router.post('/login', function (req, res, next) {

    if (req.body && req.body.user && req.body.pass) {
        User.findOne({user: req.body.user, pass: req.body.pass}, function (err, user) {
            if (err) {
                res.status(500).json({sucess: false, error: err.message})
            } else {
                if (user) {
                    // create a token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 60 * 60 * 24 // 24 hours
                    });
                    res.json({sucess: true, token: token, user: user})
                } else {
                    res.status(404).json({sucess: false, error: 'Invalid credentials'})
                }
            }
        });
    } else {
        res.status(400).json({sucess: false, error: 'No username or password sent'})
    }
});

// Logout
router.get('/logout', function (req, res, next) {
    if (req.cookies.url !== undefined) {
        res.clearCookie('user')
    }
    return res.redirect('login')
});

// Test function
router.get('/cookies', decode, function (req, res, next) {
    if (req && req.decoded && req.decoded._doc &&  req.decoded._doc.user){
        res.json({sucess: true, cookies: 'Get the damm cookie, '+req.decoded._doc.user})
    } else {
        res.status(403).json({sucess: false, cookies: 'We don\'t give cookies to anons'})
    }
});

// Reset
reset = function () {
    User.remove({}, function (err) {
        if (err) {
            return next(err)
        } else {
            console.log('Resetting users...');
            [
                ['Administrator', 'admin', 'admin', 1],
                ['User', 'user', 'user', 0],
                ['Snooze', 'bad', 'motherfucker', 0],
                ['flag', 'flag', 'y4Grq$nU%!PG', 0]
            ].forEach(function (cred) {
                console.log(' - Insterting '+cred);

                var instance = new User();

                instance.title = cred[0];
                instance.user = cred[1];
                instance.pass = cred[2];
                instance.rol = cred[3];

                instance.save();
            });
        }
    })
};

module.exports = {
    router: router,
    schema: User,
    reset: reset,
    check: decode
};

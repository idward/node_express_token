var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    res.json({message: 'Welcome to the coolest API on earth!'});
});

/* GET users listing. */
router.get('/setup', function (req, res, next) {
    var user = new User();
    user.name = 'Nick Cerminara';
    user.password = 'password';
    user.admin = true;

    user.save(function (err, result) {
        if (err) {
            throw err;
        }
        console.log('User saved successfully');
        res.json({success: true});
    });
});

router.get('/users', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.post('/authenticate', function (req, res, next) {
    User.findOne({name: req.body.name}, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else {
            if (user.password !== req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong Password.'});
            } else {
                var token = jwt.sign(user, res.locals.secret, {
                    expiresIn: 60*60*24  //expires in 24 hours
                });

                res.json({success: true, message: 'Enjoy your token!', token: token});
            }
        }
    });
});


module.exports = router;

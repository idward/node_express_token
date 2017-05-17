var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Hello! The API is at http://localhost:' + res.locals.port + '/api');
});

module.exports = router;

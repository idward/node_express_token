var mongoose = require('mongoose');
var config = require('../config/basic_config')

mongoose.connect(config.database);

var db = mongoose.connection;

module.exports = db;

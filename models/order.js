const mongoose = require('mongoose');
const Location = require('./location');

module.exports = mongoose.Schema({
    name: String,
    location: Location
});

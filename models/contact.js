const mongoose = require('mongoose');
const Location = require('./location');

module.exports = mongoose.Schema({
    company: String,
    lastName: String,
    firstName: String,
    telephone: [String],
    email: [String],
    location: Location
});


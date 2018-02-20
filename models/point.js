const mongoose = require('mongoose');
const Location = require('../../Transit_OrderDataService/models/location');

module.exports = mongoose.Schema({
    name: String,
    location: Location,
    time: Date
});


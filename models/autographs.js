const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    sender: String,
    transporter: String,
    receiver: String
});


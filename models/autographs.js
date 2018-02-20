const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    sender: String, // Zou uit OrderDataService kunnen komen
    transporter: String, // Uit ConfigService
    receiver: String // Zou uit OrderDataService kunnen komen
});


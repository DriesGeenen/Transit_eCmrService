const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    productCode: String,
    name: String,
    amount: Number
});
const mongoose = require('mongoose');
const Contact = require('./contact');
const Order = require('./order');
const Point = require('./point');
const Autographs = require('./autographs');

const ecmrSchema = mongoose.Schema({
    setup: Point,
    sender: Contact,
    receiver: Contact,
    deliveryLocation: Point,
    mainTransporter: Contact,
    reception: Point,
    goods: [Order],
    confirmedDelivery: Point,
    autographs: Autographs
});

const Ecmr = module.exports = mongoose.model('Ecmr', ecmrSchema);
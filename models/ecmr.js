const mongoose = require('mongoose');
const Contact = require('./contact');
const Location = require('./location');
const Product = require('./product');
const Point = require('./point');
const Autographs = require('./autographs');

const ecmrSchema = mongoose.Schema({
    driver: String, // Ingevuld door RFID scan systeem

    setup: Point, // Date: now / name ? / location uit ConfigService
    sender: Contact, // Uit orderData
    receiver: Contact, // Uit orderData / Factuuradres
    deliveryLocation: Location, // Uit orderData / Effectief leveradres / receiver
    mainTransporter: Contact, // add ConfigService
    reception: Point, // Date: geschatte leverdatum..? / == comfirmedDelivery?
    goods: [Product], // Uit orderData
    confirmedDelivery: Point, // Op papier in te vullen bij levering. / digitaal bijhouden?
    autographs: Autographs
});

const Ecmr = module.exports = mongoose.model('Ecmr', ecmrSchema);
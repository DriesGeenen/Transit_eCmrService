const mongoose = require('mongoose');
const Contact = require('./contact');
const Product = require('./product');
const Point = require('./point');
const Autographs = require('./autographs');

const ecmrSchema = mongoose.Schema({
    driver: String, // Ingevuld door RFID scan systeem

    setup: Point, // Date: now / name ? / location uit ConfigService
    sender: Contact, // Uit orderData
    receiver: Contact, // Uit orderData / Factuuradres
    deliveryLocation: Point, // Uit orderData / Effectief leveradres / receiver
    mainTransporter: Contact, // add ConfigService
    reception: Point, // Date: geschatte leverdatum..? / == comfirmedDelivery?
    goods: [Product], // Uit orderData
    confirmedDelivery: Point, // Op papier in te vullen bij levering. / digitaal bijhouden?
    autographs: Autographs,
    finished: {
        type: Boolean,
        default: false
    }
});

const Ecmr = module.exports = mongoose.model('Ecmr', ecmrSchema);
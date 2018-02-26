'use strict';

var mongoose = require('mongoose');
var Ecmr = mongoose.model('Ecmr');

exports.getAllEcmrs = function () {
    return Ecmr.find({});
};

exports.getEcmrById = function (id) {
    return Ecmr.findById(id);
};

exports.getEcmrsByUserId = function (userId) {
    // return Ecmr.findOne({user: userId}).select('-user');
    return Ecmr.find({user: userId})
};

exports.getFinishedEcmrsByDriverId = function (userId) {
    return Ecmr.find({driver: userId, finished: true})
};

exports.getCurrentEcmrsByDriverId = function (userId) {
    return Ecmr.find({driver: userId, finished: false})
};

exports.addEcmr = function (newEcmr) {
    return newEcmr.save();
};

exports.updateEcmr = function (id, ecmr) {
    return Ecmr.update({_id: id}, ecmr);
};

exports.updateEcmrToFinished = function(id){
    return Ecmr.update({_id: id}, {finished: true});
};

exports.deleteEcmr = function (id) {
    return Ecmr.remove({_id: id});
};

exports.addManyEcmrs = function(ecmrArray){
    return Ecmr.insertMany(ecmrArray);
};
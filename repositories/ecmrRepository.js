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

exports.addEcmr = function (newEcmr) {
    return newEcmr.save();
};

exports.updateEcmr = function (id, ecmr) {
    return Ecmr.update({_id: id}, ecmr);
};

exports.deleteEcmr = function (id) {
    return Ecmr.remove({_id: id});
};

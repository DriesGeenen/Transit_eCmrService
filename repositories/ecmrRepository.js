'use strict';

var mongoose = require('mongoose');
var Ecmr = mongoose.model('Ecmr');

exports.getAllEcmrs = function () {
    return Ecmr.find({}).select('-password');
};

exports.getEcmrById = function (id) {
    return Ecmr.findById(id).select('-password');
};

exports.getEcmrByEmail = function (email) {
    return Ecmr.findOne({email: email});
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

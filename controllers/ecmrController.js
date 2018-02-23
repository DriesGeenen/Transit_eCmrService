'use strict';

var EcmrRepository = require('../repositories/ecmrRepository');
var Ecmr = require('../models/ecmr');

exports.getAllEcmrs = function (req, res) {
    var promise = EcmrRepository.getAllEcmrs();
    promise.then(function (ecmrs) {
        return res.json({success: true, data: ecmrs});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMRs', error: err});
    });
};

exports.getEcmrById = function (req, res) {
    var promise = EcmrRepository.getEcmrById(req.params.id);
    promise.then(function (ecmr) {
        return res.json({success: true, data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMR', error: err});
    });
};

exports.getEcmrsByLoggedInUser = function (req, res) {
    var promise = EcmrRepository.getEcmrsByUserId(req.user.data._id);
    promise.then(function (ecmr) {
        return res.json({success: true, data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMR', error: err});
    });
};

exports.getFinishedEcmrsByDriverid = function (req, res) {
    var promise = EcmrRepository.getFinishedEcmrsByDriverId(req.params.id);
    promise.then(function (ecmrs) {
        return res.json({success: true, data: ecmrs});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMRs', error: err});
    });
};

exports.getCurrentEcmrsByDriverid = function (req, res) {
    var promise = EcmrRepository.getCurrentEcmrsByDriverId(req.params.id);
    promise.then(function (ecmrs) {
        return res.json({success: true, data: ecmrs});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMRs', error: err});
    });
};

exports.addEcmr = function (req, res) {
    var newEcmr = new Ecmr(req.body);
    var promise = EcmrRepository.addEcmr(newEcmr);
    promise.then(function (ecmr) {
        return res.json({success: true, msg: 'Ecmr created', data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create e-CMR', error: err});
    });
};

exports.updateEcmr = function (req, res) {
    var promise = EcmrRepository.updateEcmr(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Ecmr updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update e-CMR', error: err});
    });
};

exports.deleteEcmr = function (req, res) {
    var promise = EcmrRepository.deleteEcmr(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Ecmr removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove e-CMR', error: err});
    });
};


//

exports.addManyEcmrs = function(req, res){
    var ecmrArray = req.body;
    var promise = EcmrRepository.addManyEcmrs(ecmrArray);
    promise.then(function (ecmr) {
        return res.json({success: true, msg: 'Ecmrs created', data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create e-CMRs', error: err});
    });
};


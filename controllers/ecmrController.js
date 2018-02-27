'use strict';

const EcmrRepository = require('../repositories/ecmrRepository');
const Ecmr = require('../models/ecmr');

const config = require('../config/config');
const jwt = require('jsonwebtoken');
const request = require('request-promise');

const trackingServiceUrl = process.env.TRACKING_SERVICE_URL || 'http://localhost:6609/trackings';

exports.getAllEcmrs = function (req, res) {
    const promise = EcmrRepository.getAllEcmrs();
    promise.then(function (ecmrs) {
        return res.json({success: true, data: ecmrs});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMRs', error: err});
    });
};

exports.getEcmrById = function (req, res) {
    const promise = EcmrRepository.getEcmrById(req.params.id);
    promise.then(function (ecmr) {
        return res.json({success: true, data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get e-CMR', error: err});
    });
};

exports.getEcmrsByLoggedInUser = function (req, res) {
    const promise = EcmrRepository.getEcmrsByUserId(req.user.data._id);
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

exports.updateEcmrToFinished = function (req, res){
    var promise = EcmrRepository.updateEcmrToFinished(req.params.id);
    promise.then(function (ecmr) {
        return res.json({success: true, data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update e-CMR', error: err});
    });
};

exports.addEcmr = function (req, res) {
    const newEcmr = new Ecmr(req.body);
    const promise = EcmrRepository.addEcmr(newEcmr);
    promise.then(function (ecmr) {
        return res.json({success: true, msg: 'Ecmr created', data: ecmr});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create e-CMR', error: err});
    });
};

exports.updateEcmr = function (req, res) {
    const promise = EcmrRepository.updateEcmr(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Ecmr updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update e-CMR', error: err});
    });
};

exports.deleteEcmr = function (req, res) {
    const promise = EcmrRepository.deleteEcmr(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Ecmr removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove e-CMR', error: err});
    });
};


//

exports.addManyEcmrs = function(req, res){
    const ecmrArray = req.body;
    const promise = EcmrRepository.addManyEcmrs(ecmrArray);
    promise.then(function () {
        return requestGenerateTrackingCodes(filterEcmrArrayForTracking(ecmrArray));
    }, function (err) {
        console.log('Save CMR failed');
        return res.status(500).json({success: false, msg: 'Failed to request save e-CMRs', error: err});
    }).then(function(response){
        return res.json({success: true, msg: 'Ecmrs created', data: JSON.parse(response).body});
    }, function (err){
        console.log('Tracking code generation failed');
        console.log(err);
        return res.status(200).json({success: false, msg: 'Failed to request tracking code generation', error: err});
        return res.status(500).json({success: false, msg: 'Failed to request tracking code generation', error: err});
    });
};

const requestGenerateTrackingCodes = function (body) {
    const options = {
        url: trackingServiceUrl + '/generate',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': generateEcmrServiceToken()
        },
        body: JSON.stringify(body)
    };
    return request.post(options);
};

const generateEcmrServiceToken = function () {
    return 'JWT ' + jwt.sign({
        data: {role: 'ecmrservice'}
    }, config.secret, {
        expiresIn: 60
    });
};

const filterEcmrArrayForTracking = function(ecmrArray){
    const out = [];
    for (let i = 0; i<ecmrArray.length;i++){
        out.push(filterEcmrForTracking(ecmrArray[i]));
    }
    return out;
};

const filterEcmrForTracking = function(ecmr){
  return {
      driver: ecmr.driver,
      email:ecmr.receiver.email,
      //telephone:ecmr.receiver.telephone
  }
};
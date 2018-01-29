'use strict';

module.exports = function (app) {
    var TrackingController = require('../controllers/trackingController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/trackings')
        .get(AuthHelper.loginRequired, TrackingController.getAllTrackings)
        .post(AuthHelper.adminRequired, TrackingController.addTracking);

    app.route('/trackings/:id')
        .get(AuthHelper.loginRequired, TrackingController.getTrackingById)
        .delete(AuthHelper.adminRequired, TrackingController.deleteTracking)
        .put(AuthHelper.adminRequired, TrackingController.updateTracking);

};
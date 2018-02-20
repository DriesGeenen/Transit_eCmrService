'use strict';

module.exports = function (app) {
    var EcmrController = require('../controllers/ecmrController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/ecmrs')
        .get(EcmrController.getAllEcmrs)
        .post(EcmrController.addEcmr);

    // todo improve security for get
    app.route('/ecmrs/:id')
        .get(EcmrController.getEcmrById)
        .delete(EcmrController.deleteEcmr)
        .put(EcmrController.updateEcmr);

    app.route('/ecmrs/mine')
        .get(EcmrController.getEcmrsByLoggedInUser);

    app.route('/ecmrs/many')
        .post(EcmrController.addManyEcmrs);

    /*app.route('/ecmrs')
        .get(AuthHelper.adminRequired, EcmrController.getAllEcmrs)
        .post(AuthHelper.rfidToCmrRequired, EcmrController.addEcmr);

    // todo improve security for get
    app.route('/ecmrs/:id')
        .get(AuthHelper.adminOrOwnRequired, EcmrController.getEcmrById)
        .delete(AuthHelper.adminRequired, EcmrController.deleteEcmr)
        .put(AuthHelper.adminRequired, EcmrController.updateEcmr);

    app.route('/ecmrs/mine')
        .get(EcmrController.getEcmrsByLoggedInUser);

    app.route('/ecmrs/generate')
        .post(EcmrController.generateEcmr);*/
};
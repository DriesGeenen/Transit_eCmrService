'use strict';

module.exports = function (app) {
    var EcmrController = require('../controllers/ecmrController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/users')
        .get(AuthHelper.adminRequired, EcmrController.getAllEcmrs)
        .post(AuthHelper.rfidToCmrRequired, EcmrController.addEcmr);

    app.route('/users/:id')
        .get(EcmrController.getEcmrById)
        .delete(EcmrController.deleteEcmr)
        .put(EcmrController.updateEcmr);

};
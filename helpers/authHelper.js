exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.adminRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "admin") {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized administrator!' });
    }
};

exports.adminOrOwnRequired = function(req, res, next) {
    // todo make a working function
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user or administrator!' });
    }
};

exports.rfidToCmrRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "rfidtocmr") {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized!'});
    }
};

exports.orderDataServiceRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "orderdataservice") {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized!'});
    }
};
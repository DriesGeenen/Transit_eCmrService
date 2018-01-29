const mongoose = require('mongoose');
// todo
const trackingSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
        required: true
    }
});

const Tracking = module.exports = mongoose.model('Tracking', trackingSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema ({
    user_email: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', User)
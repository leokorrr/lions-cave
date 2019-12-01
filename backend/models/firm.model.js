const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Firm = new Schema ({
    firm_title: {
        type: String,
        required: true
    },
    firm_date: {
        type: String,
    }
})

module.exports = mongoose.model('Firm', Firm)
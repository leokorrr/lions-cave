const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema ({
    post_inner: {
        type: String,
        required: true
    },
    post_date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', Post)
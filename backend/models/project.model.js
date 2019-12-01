const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema ({
    project_title: {
        type: String,
        required: true
    },
    project_description: {
        type: String,
    },
    project_date: {
        type: String,
    },
    project_color: {
        type: String
    },
    project_link: {
        type: String
    },
    project_github_link: {
        type: String
    }
})

module.exports = mongoose.model('Project', Project)
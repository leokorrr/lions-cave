const express = require ('express');
const router = express.Router();

const Project = require('../../models/project.model');
const Firm = require('../../models/firm.model');
const Post = require('../../models/post.model');

router.get('/projects', (req, res) => {
    Project.find((err, projects) => {
        if(err) {
            console.log(err);
        } else {
            res.json(projects)
        }
    })
})

router.get('/firms', (req, res) => {
    Firm.find((err, firms) => {
        if(err) {
            console.log(err);
        } else {
            res.json(firms)
        }
    })
})

router.get('/posts', (req, res) => {
    Post.find((err, posts) => {
        if(err) {
            console.log(err);
        } else {
            let reversePosts = posts.reverse()
            res.json(reversePosts)
        }
    })
})

module.exports = router;
const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Project = require('../models/project.model');
const Firm = require('../models/firm.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const checkAuth = require('./checkAuth.js');
const checkNotAuth = require('./checkNotAuth.js');

router.get('/login', checkNotAuth, (req, res) => {
    res.render('login-page');
})

router.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})

router.get('/registration', checkAuth, (req, res) => {
    res.render('registration-page')
})

router.post('/registration', checkAuth, (req, res) => {
    User.find({user_email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            user_name: req.body.name,
                            user_email: req.body.email,
                            user_password: hash
                        })
                        user.save().then(
                            result => {
                                console.log(result);
                                res.redirect('/login')
                            }
                        ).catch(err=>{
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            }
        })
})

router.get('/projects', checkAuth, (req, res) => {
    Project.find((err, projects) => {
        if(err) {
            console.log(err);
        } else {
            res.render('projects-page', {projects: projects})
        }
    })
})

router.post('/projects', checkAuth, (req, res) => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
        month = "0" + month;
    }
    let day = dateObj.getUTCDate();
    if (day < 10) {
        day = "0" + day;
    }
    let year = dateObj.getUTCFullYear();

    let newdate = day + "." + month + "." + year;

    let project = new Project ({
        project_title: req.body.projectTitle,
        project_description: req.body.projectDescription,
        project_date: newdate,
        project_color: req.body.projectColor,
        project_link: req.body.projectLink,
        project_github_link: req.body.projectGithubLink
    })

    project.save((err) => {
        if(err) throw err;
        console.log('New project was succesfully added');
    })

    res.redirect('/projects');
})

router.post('/delete-project', checkAuth, (req, res) => {
    let id = req.body.projectId
    Project.findByIdAndRemove({_id: id}, (err) => {
        if (err) {
           console.log(err)
           return res.status(500).send
        } 

        return res.status(200).send
    });
    res.redirect('/projects')
})

router.get('/firms', checkAuth, (req, res) => {
    Firm.find((err, firms) => {
        if(err) {
            console.log(err);
        } else {
            res.render('firms-page', {firms: firms})
        }
    })
})

router.post('/delete-firm', checkAuth, (req, res) => {
    let id = req.body.projectId
    Firm.findByIdAndRemove({_id: id}, (err) => {
        if (err) {
           console.log(err)
           return res.status(500).send
        } 

        return res.status(200).send
    });
    res.redirect('/firms')
})

router.post('/firms', checkAuth, (req, res) => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
        month = "0" + month;
    }
    let day = dateObj.getUTCDate();
    if (day < 10) {
        day = "0" + day;
    }
    let year = dateObj.getUTCFullYear();

    let newdate = day + "." + month + "." + year;

    let firm = new Firm ({
        firm_title: req.body.firmTitle,
        firm_date: newdate
    })

    firm.save((err) => {
        if(err) throw err;
        console.log('New firm was succesfully added');
    })

    res.redirect('/firms');
})

router.get('/posts', checkAuth, (req, res) => {
    Post.find((err, posts) => {
        if(err) {
            console.log(err);
        } else {
            let reversePosts = posts.reverse()
            res.render('posts-page', {posts: reversePosts})
        }
    })
})

router.post('/posts', checkAuth, (req, res) => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
        month = "0" + month;
    }
    let day = dateObj.getUTCDate();
    if (day < 10) {
        day = "0" + day;
    }
    let year = dateObj.getUTCFullYear();

    let newdate = day + "." + month + "." + year;

    let post = new Post ({
        post_inner: req.body.postTitle,
        post_date: newdate
    })

    post.save((err) => {
        if(err) throw err;
        console.log('New post was succesfully added');
    })

    res.redirect('/posts')
})

router.post('/delete-post', checkAuth, (req, res) => {
    let id = req.body.projectId
    Post.findByIdAndRemove({_id: id}, (err) => {
        if (err) {
           console.log(err)
           return res.status(500).send
        } 

        return res.status(200).send
    });
    res.redirect('/posts')
})

router.get('/', checkAuth, (req, res) => {
    res.render('home');
})

router.get('/test', (req, res) => {
    User.find({'user_email': 'leokorr@gmail.com'})
        .then(user => {
            res.json(user)
        })
})




module.exports = router;
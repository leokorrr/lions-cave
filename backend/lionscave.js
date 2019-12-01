if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const hbs = require('hbs');
const routes = require('./routes/routes');
const api = require('./routes/api/api');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user.model')

const app = express();

const PORT = 5000;

mongoose.connect('mongodb://admin:admin123@ds343985.mlab.com:43985/lionscave', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From app.js: database connected');
})

var db = mongoose.connection;

passport.use(new LocalStrategy({usernameField: 'email'},
    function(username, password, done) {
        User.findOne({'user_email': username}, (err, user)=> {
            if (err) { return done(err) }
            if(!user) {
                return done(null, false, { message: 'Incorrect email'});
            }

            if (!bcrypt.compare(password, user.user_password)) {
                return done(null, false, { message: 'Incorrect password.'})
            }

            return done(null, user)
        })
    }
))

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false
}))

// settings views folder
app.set('views',path.join(__dirname,'views'))

// setting views engine
app.set('view engine','hbs')

// setting default layout of app
app.set('view options', { layout: 'layouts/main' });

hbs.registerHelper('incremented', function (index) {
    index++;
    return index;
});

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
      });
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use('/', routes);
app.use('/api', api);

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
})
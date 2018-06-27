
//Get a router instance
const express = require('express');
const router = express.Router();

//Grab configs for Twitter
const Twitter = require('../config/Twitter');

//Connect to user database
const User = require('../models/User');

const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

var passportOption = {
    consumerKey: Twitter.CONSUMER_KEY,
    consumerSecret: Twitter.CONSUMER_SECRET,
    callbackURL: Twitter.CALLBACK_URL}

passport.use(new Strategy(passportOption,
    function (token, tokenSecret, profile, callback){
        User.findOneAndUpdate({userID: profile.id},
            {
                userID: profile.id,
                username: profile.username
            },
            {'upsert': 'true'},
            function(err, result){
                if(err){
                    console.log(err)
                    return callback(err, null)
                }
                else{
                    return callback(null, profile)
                }
            })
    })
)

passport.serializeUser(function (user, callback) {
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
})

router.get('/logout', function (req, res, next) {
    User.findOne({userID: req.user.userID})
        .then(function (err, response) {
            req.logOut()
            res.clearCookie()
            res.status = 401
            res.redirect('http://localhost:4200')
        })
})

router.get('/twitter',
    passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/'
}), function (req, res) {
    res.cookie('userId', res.req.user.id);
    res.cookie('userName', res.req.user.displayName);
    res.cookie('authStatus', 'true');
    res.redirect('http://localhost:4200');
    //res.render('main', {message: 'Welcome '+ req.user.username})
})

module.exports = router;

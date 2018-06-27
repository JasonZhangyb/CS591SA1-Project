var express = require('express');
var router = express.Router();
const SE = require('../config/SightEngine');

//POST -- recognize celebrity from image url
router.post('/', function (req, res) {
    let image = req.body.url;
    var sightengine = require('sightengine')(SE.API_USER, SE.API_KEY);
    sightengine.check(['celebrities']).set_url(image).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.send(err);
    })
})

module.exports = router;
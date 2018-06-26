var express = require('express');
var router = express.Router();

const authCheck = function (req, res, next) {
    if (!req.isAuthenticated())
        res.sendStatus(401)
    else next()
}

router.get('/', function (req, res) {
    if (!req.isAuthenticated())
        res.send(false);
    else res.send(true);
})

module.exports = router;
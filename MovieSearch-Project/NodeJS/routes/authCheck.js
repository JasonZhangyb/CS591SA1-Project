var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (!req.isAuthenticated())
        res.send(false);
    else res.send(true);
})

module.exports = router;
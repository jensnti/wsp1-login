const express = require('express');
const router = express.Router();
const cel = require('connect-ensure-login');

router.get('/', cel.ensureLoggedIn('/login') , function(req, res){
    res.render('home');
});

module.exports = router;
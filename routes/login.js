const express = require('express');
const router = express.Router();

const { query } = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
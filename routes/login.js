const express = require('express');
const router = express.Router();

const { query } = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// for action
router.post('/', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    // check if user exists
    try {
      const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

      const result = await query(sql, username, password);

      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/dashboard');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
    } catch(e) {
      next(e);
      console.error(e);
    }
  }
});

module.exports = router;
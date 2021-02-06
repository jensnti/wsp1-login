const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { query } = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* Try to login user */
router.post('/', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    // check if user exists
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';

      const result = await query(sql, username, password);
      
      bcrypt.compare(password, result[0].password, function(err, result) {
        if (result == true) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/dashboard');
        } else {
          res.send('Incorrect Username and/or Password!');
        }
      });
    } catch(e) {
      next(e);
      console.error(e);
    }
  }
});

/* https://www.npmjs.com/package/bcrypt
 * En route för att skapa en password has eftersom vi inte har en
 * registrering
 * När denna hash är sparad i databasen behöver inloggnings
 */ 

router.get('/hash/:pwd', async function(req, res, next) {
  const password = req.params.pwd;

  bcrypt.hash(password, 10, function(err, hash) {
      console.log(hash);
      res.status(200);
      res.json({
        pwd: hash
      });
  });
});

module.exports = router;
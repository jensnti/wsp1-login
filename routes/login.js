const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

/* GET Login Index page. */
router.get('/',(req, res) => {
  res.render('login');
});

/* POST Validate the user login */
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/home');
});

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
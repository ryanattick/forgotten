'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

module.exports = router;

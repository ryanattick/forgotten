'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

// EXAMPLE ROUTE with GET request handling
router.route('/anotherone')
  .get((req, res) => {
    res.render('example.ejs');
  });

module.exports = router;

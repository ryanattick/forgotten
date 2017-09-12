'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const db = require('../db');
const Profile = require('../db/models/profiles.js');
const Puzzles = require('../db/models/puzzles.js');
const Items = require('../db/models/Items.js');
const dbUtils = require('../db/lib/utils.js');

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));

//idSelect
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);

app.get('/mapsData', function(req, res) {
  var id = req.user.id;
  Profile.forge({id: req.user.id}).fetch({columns: 'level'}).then((results) => {
    res.send(JSON.stringify(results.attributes.level));
  }).catch((err) => {
    throw err;
  });
});

app.get('/puzzleData', function(req, res) {
  var clean = [];
  var puzzles = {questions: {}, answers: {}, messages: {}, stories: {}};
  Puzzles.forge().fetchAll()
    .then(function (results) {
      for (var i = 0; i < results.models.length; i++) {
        puzzles.questions[results.models[i].attributes.puzzleID] = results.models[i].attributes.problem;
        puzzles.answers[results.models[i].attributes.puzzleID] = results.models[i].attributes.solution;
        puzzles.messages[results.models[i].attributes.puzzleID] = results.models[i].attributes.message_pop_up;
        puzzles.stories[results.models[i].attributes.puzzleID] = results.models[i].attributes.story_pop_up;
        // clean.push(results.models[i].attributes);
      }

      // var strArr = JSON.stringify(clean);
      res.status(200).send(JSON.stringify(puzzles));
    })
    .catch(function (err) {
      // If this expect statement is reached, there's an error.
      console.log('err');
    });

  // res.send({questions: {
  //   '0': 'Question1',
  //   '1': 'Question2',
  //   '2': 'Question3',
  //   '3': 'Question4',
  //   '4': 'Question5',
  //   '5': 'Question6',
  //   '6': 'Question7',
  //   '7': 'Question8',
  //   '8': 'Question9',
  //   '9': 'Question10'
  //   },
  //   answers: {
  //     '0': 'notAnswer',
  //     '1': 'notAnswer',
  //     '2': 'notAnswer',
  //     '3': 'notAnswer',
  //     '4': 'notAnswer',
  //     '5': 'notAnswer',
  //     '6': 'notAnswer',
  //     '7': 'notAnswer',
  //     '8': 'notAnswer',
  //     '9': 'notAnswer'
  //   },
  //   messages: {
  //     '0': 'Message goes here',
  //     '1': 'Message goes here',
  //     '2': 'Message goes here',
  //     '3': 'Message goes here',
  //     '4': 'Message goes here',
  //     '5': 'Message goes here',
  //     '6': 'Message goes here',
  //     '7': 'Message goes here',
  //     '8': 'Message goes here',
  //     '9': 'Message goes here'
  //   }
  // });
});

app.post('/mapData', function(req, res) {
  Profile.forge({id: req.user.id}).save({level: req.body.level}).then(function() {
    console.log('level saved!');
    res.status(200).send(JSON.stringify('success'));
  }).catch((err) => {
    throw err;
  });
  // retrieve any item from the Items table containing that lvl (puzzle id)
  // and add that item id along with the user id to the users_items table
  // and set the users_items table record's 'equipped' column to either
  // No or Not Possible based on equippable property of the item
});

app.use(['/account', '/maps', '/backpack', '/about'], routes.allOtherRoutes);

app.get('/userInfo', function (req, res) {
  //console.log(req.user, 'req.users exists');
  res.status(200).send(req.user);
});


app.get('/playerItems', function (req, res) {
  var clean = [];

  Items.forge().fetchAll()
    .then(function (results) {
      for (var i = 0; i < results.models.length; i++) {
        clean.push(results.models[i].attributes);
      }
      var strArr = JSON.stringify(clean);
      res.status(200).send(strArr);
    })
    .catch(function (err) {
      // If this expect statement is reached, there's an error.
      console.log('err');
    });
  //res.status(200).send(req);
});


app.post('/updateAvatar', function (req, res) {
  console.log(req.body, 'req.body updateavatar exists');
  // Profile.forge({first: "John", last: "Smith"}).save().then(function() {
  //   console.log('saved')
  // })
  Profile.forge({id: req.body.id}).save({avatar: req.body.avatar}).then(function() { //...
    console.log('avatar saved!!');
    res.send('201');
  });
});




app.post('/updateUsername', function (req, res) {
  console.log(req.body, 'req.body update username exists');
  // Profile.forge({first: "John", last: "Smith"}).save().then(function() {
  //   console.log('saved')
  // })
  Profile.forge({id: req.body.id}).save({username: req.body.username}).then(function() { //...
    console.log('username saved!!');
    res.send('201'); //I don't know why this works, but it does.
  });
});

module.exports = app;
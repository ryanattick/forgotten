
'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const db = require('../db');
const Profile = require('../db/models/profiles.js');
const Items = require('../db/models/profiles.js');
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
  // send back user level
  // res.json(num)
});

app.post('/mapData', function(req, res) {
  //post user level to the db
});

app.use(['/account', '/maps', '/backpack', '/about'], routes.allOtherRoutes);

app.get('/userInfo', function (req, res) {
  //console.log(req.user, 'req.users exists');
  res.status(200).send(req.user);
});


// app.get('/playerItems', function (req, res) {
//   Items.forge().fetchAll()
//       .then(function (results) {
//         console.log(results._byId)
//         res.status(200).send(results._byId);
//       })
//       .catch(function (err) {
//         // If this expect statement is reached, there's an error.
//         console.log('err')
//       });
//   //res.status(200).send(req);
// });


app.post('/updateAvatar', function (req, res) {
  console.log(req.body, 'req.body updateavatar exists');
  // Profile.forge({first: "John", last: "Smith"}).save().then(function() {
  //   console.log('saved')
  // })
  Profile.forge({id: req.body.id}).save({avatar: req.body.avatar}).then(function() { //...
    console.log('avatar saved!!');
  });
});


app.post('/updateUsername', function (req, res) {
  console.log(req.body, 'req.body update username exists');
  // Profile.forge({first: "John", last: "Smith"}).save().then(function() {
  //   console.log('saved')
  // })
  Profile.forge({id: req.body.id}).save({username: req.body.username}).then(function() { //...
    console.log('username saved!!');
  });
});

app.get('/playerItems', function(req, res) {

  var items = [
    {
      id: 0,
      name: 'Blue Pill',
      description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
      type: 'Consumable', /* Miscellaneous, Reward, etc. */
      equipped: 'Not Possible', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    },
    {
      id: 1,
      name: 'Guide Book #1',
      description: 'This edition of the Guide Book allows you to have a free hint on each quest',
      type: 'Support', /* Miscellaneous, Reward, etc. */
      equipped: 'No', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    },
    {
      id: 2,
      name: 'Invitation #1',
      description: 'Piece of Paper',
      type: 'Storyline', /* Miscellaneous, Reward, etc. */
      equipped: 'Not Possible', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    },
    {
      id: 3,
      name: 'Invitation #3',
      description: 'Piece of Paper',
      type: 'Storyline', /* Miscellaneous, Reward, etc. */
      equipped: 'Not Possible', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    },
    {
      id: 4,
      name: 'Lantern',
      description: 'Lights up the righteous path',
      type: 'Support', /* Miscellaneous, Reward, etc. */
      equipped: 'No', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    },
    {
      id: 5,
      name: 'Vision',
      description: 'You had a vision of a goat',
      type: 'Miscellaneous', /* Miscellaneous, Reward, etc. */
      equipped: 'Not Possible', /* Yes, No, Not Possible */
      img_url: '/assets/items/paper.jpg',
      puzzle_id: null
    }
  ];

  // retrieve all items that are owned by user based on User Id stored in the request
  // send all items back to the backpack
  res.status(200).send(JSON.stringify(items));
});

// Sample Items table data
// id
// name
// description
// img_url
// user_id
// puzzle_id
// equipped



module.exports = app;
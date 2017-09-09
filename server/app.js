
'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
const db = require('../db');
const Profile = require('../db/models/profiles.js');
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


// Sample Items table data
// id
// name
// description
// img_url
// user_id
// puzzle_id
// equipped


// Sample Items table data
// id
// name
// description
// img_url
// user_id
// puzzle_id
// equipped


// Sample Items table data
// id
// name
// description
// img_url
// user_id
// puzzle_id
// equipped



module.exports = app;
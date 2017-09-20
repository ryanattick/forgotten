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
const userStories = require('../db/models/userStories.js');
const userItems = require('../db/models/users_items.js');
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
  Profile.forge({id: req.user.id}).fetch({columns: ['level', 'lives']}).then((results) => {
    console.log(results.attributes);
    res.send(JSON.stringify(results.attributes));
  }).catch((err) => {
    throw err;
  });
});

app.get('/puzzleData', function(req, res) {
  var clean = [];
  var puzzles = {questions: {}, answers: {}, messages: {}, stories: {}, items: {}, time: {}};
  Puzzles.forge().fetchAll()
    .then(function (results) {
      for (var i = 0; i < results.models.length; i++) {
        if (results.models[i].attributes.puzzleID < 10) {
          puzzles.questions['0' + JSON.stringify(results.models[i].attributes.puzzleID)] = results.models[i].attributes.problem;
          puzzles.answers['0' + JSON.stringify(results.models[i].attributes.puzzleID)] = results.models[i].attributes.solution;
          puzzles.messages['0' + JSON.stringify(results.models[i].attributes.puzzleID)] = results.models[i].attributes.message_pop_up;
          puzzles.stories['0' + JSON.stringify(results.models[i].attributes.puzzleID)] = results.models[i].attributes.story_pop_up;
          puzzles.time['0' + JSON.stringify(results.models[i].attributes.puzzleID)] = results.models[i].attributes.time_limit;
        } else {
          puzzles.questions[results.models[i].attributes.puzzleID] = results.models[i].attributes.problem;
          puzzles.answers[results.models[i].attributes.puzzleID] = results.models[i].attributes.solution;
          puzzles.messages[results.models[i].attributes.puzzleID] = results.models[i].attributes.message_pop_up;
          puzzles.stories[results.models[i].attributes.puzzleID] = results.models[i].attributes.story_pop_up;
          puzzles.time[results.models[i].attributes.puzzleID] = results.models[i].attributes.time_limit;
        }
      }
    })
    .then(() => {
      Items.forge().fetchAll()
        .then((results) => {
          for (var i = 0; i < results.models.length; i++) {
            puzzles.items[results.models[i].attributes.id] = {name: results.models[i].attributes.name, puzzleID: results.models[i].attributes.puzzle_id};
          }
        })
        .then(() => {
          res.status(200).send(JSON.stringify({puzzles: puzzles, playerName: req.user.first, avatar: req.user.avatar}));
        });
    })
    .catch(function (err) {
      console.log('err', err);
    });
});


//grab puzzle ids from user_stories that correspond to the current user id

app.post('/mapData', function(req, res) {
  Profile.forge({id: req.user.id}).save({level: req.body.level, lives: req.body.lives}).then(function() {
    console.log('level saved!');
  })
    .then(() => {
      userStories.forge().save({puzzle_id: req.body.level, user_id: req.user.id});
      console.log('user stories saved!!');
    })
    .then(() => {
      res.status(200).send(JSON.stringify('success'));
    })
    .catch((err) => {
      throw err;
    });
});


app.post('/lives', function(req, res) {
  Profile.forge({id: req.user.id}).save({lives: req.body.lives}).then(function() {
    console.log('lives saved!');
    res.status(200).send(JSON.stringify('success'));
  }).catch((err) => {
    throw err;
  });
});

app.post('/removeItems', function(req, res) {
  Items.where('puzzle_id', '>', req.body.level).fetchAll().then(function(results) {
    for (var i = 0; i < results.models.length; i++) {
      userItems.where({'user_id': req.user.id}).where(results.models[i].attributes.puzzle_id, '>', req.body.level).destroy().then(function() {
      });
    }
    res.status(200).send(JSON.stringify('success'));
  })
    .catch((err) => {
      throw err;
    });
});

app.use(['/account', '/maps', '/backpack', '/about', '/storyline'], routes.allOtherRoutes);

app.get('/userInfo', function (req, res) {
  console.log(req.user, 'req.users exists');
  // db.getUsername(req.user);
  console.log('userinfo', req.user);
  res.status(200).send(JSON.stringify(req.user));
});


app.get('/playerItems', function (req, res) {
  // Profile.forge({id: req.user.id}).fetch({columns: 'level'}).then((results) => {
  //   res.send(JSON.stringify(results.attributes.level));
  //model.where('favorite_color', '<>', 'green').fetch().then(function() { //...
  //model.query({where: {"Date", '>=' , first_date}, orWhere: {"Date", '<=' , last_date}})
  Profile.where({id: req.user.id}).fetchAll({withRelated: ['items']})
    .then((result) => {
      console.log('result of /playerItems', result.toJSON()[0].items);
      res.status(200).send(JSON.stringify((result.toJSON()[0].items)));
    });
  // .then((arr) => {
  //   var result = [];
  //   for (var i = 0; i < arr.length; i++) {
  //     Items.where({id: arr[i]}).fetch().then((res) => {
  //       //fetch it then push it into another arr
  //        result.push(res.attributes);
  //     })
  //   }
  //   console.log(result)
  // }).then((result) => {
  //   console.log(result);
  // })

  //console.log('playeritems', req.user.level);
  // Items.fetchAll()
  //   .then((results) => {
  //     var change = results.map((item) => item.attributes).filter((item) => item.puzzle_id <= req.user.level);
  //     console.log(change, 'CHANGE?');
  //     res.status(200).send(JSON.stringify(change));
  //   })
  //   .catch((err) => {
  //     console.log(err, 'error');
  //   });
});


app.post('/initialItem', function(req, res) {
  userItems.where({user_id: req.user.id, item_id: req.body.id})
    .fetch()
    .then((result) => {
      if (!result) {
        userItems.forge().save({user_id: req.user.id, item_id: req.body.id, equipped: 'Not Possible'})
          .then(() => {
            res.status(201).send(JSON.stringify('Initial Item stored'));
          })
          .catch(() => {
            res.status(401).send(JSON.stringify('Initial Item failed to be stored'));
          });
      } else {
        res.status(201).send(JSON.stringify('Initial Item already stored'));
      }
    })
    .catch((error) => {
      console.log('PHONE DOESNT EXIST', error);
    });
});


app.post('/userItems', function (req, res) {
  Items.fetchAll()
    .then((results) => {
      var change = results.map((item) => item.attributes).filter((item) => item.puzzle_id === req.user.level + 1);
      console.log(change);
      for (var i = 0; i < change.length; i++) {
        userItems.forge().save({user_id: req.user.id, item_id: change[i].id, equipped: 'no'}).then(() => {
          console.log('user items saved');
        });
      }
    res.send('201');
    })
    .catch((err) => {
      console.log(err, 'error');
    });
});

app.get('/puzzleItems', function (req, res) {
  userItems.where({'user_id': req.user.id, equipped: 'yes'}).fetchAll()
    .then((results) => {
      var items = [];
      var loop = function() {
        for (var i = 0; i < results.models.length; i++) {
          Items.where('id', results.models[i].attributes.item_id).fetchAll()
            .then((result) => {
              items.push(result.models[0].attributes);
            });
        }
      };
      Promise.resolve(loop())
        .then(() => {
          setTimeout(() => {
            res.send(items);
          }, 100);
        });
    })
    .catch((err) => {
      throw err;
    });
});



app.get('/userStoryline', function (req, res) {
  userStories.fetchAll()
    .then((results) => {
      var puzzleFilter = [];
      for (var i = 0; i < results.length; i++) {
        //output all puzzles related to req.user
        if (results.models[i].attributes.user_id === req.user.id) {
          puzzleFilter.push(results.models[i].attributes.puzzle_id);
        }
      }
      return puzzleFilter;
    })
    .then((results) => {
      Puzzles.fetchAll().then((puzzles) => {

        var filter = puzzles.models.filter((item) => results.indexOf(item.attributes.puzzleID) !== -1);
        return filter.reduce((acc, item, index) => {
          var obj = {};
          obj['story'] = item.attributes.story_pop_up;
          obj['message'] = item.attributes.message_pop_up;
          obj['items'] = '';
          obj['id'] = item.attributes.puzzleID.toString();

          acc.push(obj);
          return acc;
        }, []);
      }).then((obj) => {
        Items.fetchAll().then((items) => {
          var items = items.filter((item) => results.indexOf(item.attributes.puzzle_id) !== -1).reduce((acc, item) => {

            if (!acc[item.attributes.puzzle_id]) {
              acc[item.attributes.puzzle_id] = [item.attributes.name];
            } else {
              acc[item.attributes.puzzle_id].push(item.attributes.name);
            }
            return acc;
          }, {});

          obj.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            } else {
              return -1;
            }
          });

          for (var i = 0; i < obj.length; i++) {
            if (Object.keys(items).indexOf(obj[i].id) !== -1) {
              obj[i].items = items[obj[i].id];
            } else {
              obj[i].items = [];
            }
            delete(obj[i].id);
          }
          res.status(200).send(JSON.stringify(obj));
        });
      });
    });

});


app.post('/updateAvatar', function (req, res) {
  console.log(req.body, 'req.body updateavatar exists');
  Profile.forge({id: req.body.id}).save({avatar: req.body.avatar}).then(function() { //...
    console.log('avatar saved!!');
    res.send('201');
  });
});


app.post('/deleteUser', function (req, res) {
  Profile.forge({id: req.body.id}).destroy()
    .then(function() {
      console.log('destroyed');
      res.send(JSON.stringify(200));
    })
    .catch((err) => {
      console.log('err', err);
    });

});



app.post('/updateUsername', function (req, res) {
  console.log(req.body, 'req.body update username exists');
  // Profile.forge({first: "John", last: "Smith"}).save().then(function() {
  //   console.log('saved')
  // })
  Profile.forge({id: req.body.id}).save({username: req.body.username}).then(function() { //...
    res.send('201'); //I don't know why this works, but it does.
  });
});



module.exports = app;

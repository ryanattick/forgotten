const models = require('../models');


exports.seed = function (knex, Promise) {

  return models.Items.where({ id: 0}).fetch()
    .then((Items) => {
      if (Items) {
        throw Items;
      }
      return models.Items.forge({
        name: 'Blue Pill',
        description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
        img_url: '/assets/items/paper.jpg',
        equippable: 1
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    });

};

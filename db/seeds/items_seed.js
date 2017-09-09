const models = require('../models');

exports.seed = function (knex, Promise) {

  for (var i = 0; i < items.length; i++) {
    models.Items.forge({
      name: items[i].name,
      type: items[i].type,
      description: items[i].description,
      img_url: items[i].img_url,
      equippable: items[i].equippable,
      puzzle_id: items[i].puzzle_id
    }).save()
      .error(err => {
        console.error('ERROR: failed to create items');
        throw err;
      })
      .catch(() => {
        console.log('WARNING: defualt items already exists.');
      });
  }
};

var items = [
  {
    name: 'Blue Pill',
    description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
    type: 'Consumable', /* Miscellaneous, Reward, etc. */
    equippable: 0, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  },
  {
    name: 'Guide Book #1',
    description: 'This edition of the Guide Book allows you to have a free hint on each quest',
    type: 'Support', /* Miscellaneous, Reward, etc. */
    equippable: 1, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  },
  {
    name: 'Invitation #1',
    description: 'Piece of Paper',
    type: 'Storyline', /* Miscellaneous, Reward, etc. */
    equippable: 0, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  },
  {
    name: 'Invitation #3',
    description: 'Piece of Paper',
    type: 'Storyline', /* Miscellaneous, Reward, etc. */
    equippable: 0, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  },
  {
    name: 'Lantern',
    description: 'Lights up the righteous path',
    type: 'Support', /* Miscellaneous, Reward, etc. */
    equippable: 1, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  },
  {
    name: 'Vision',
    description: 'You had a vision of a goat',
    type: 'Miscellaneous', /* Miscellaneous, Reward, etc. */
    equippable: 0, /* Yes, No, Not Possible */
    img_url: '/assets/items/paper.jpg',
    puzzle_id: null
  }
];

const db = require('../');

const Items = db.Model.extend({
  tableName: 'items'
});


module.exports = db.model('Items', Items);


// id: 0,
//           name: 'Blue Pill',
//           description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
//           type: 'Consumable',  Miscellaneous, Reward, etc.
//           equipped: 'Not Possible', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
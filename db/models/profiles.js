const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  items: function() {
    return this.belongsToMany('Items', 'users_items', 'user_id');
  }
});

//items

module.exports = db.model('Profile', Profile);


// items: [
//         {
//           id: 0,
//           name: 'Blue Pill',
//           description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
//           type: 'Consumable', /* Miscellaneous, Reward, etc. */
//           equipped: 'Not Possible', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         },
//         {
//           id: 1,
//           name: 'Guide Book #1',
//           description: 'This edition of the Guide Book allows you to have a free hint on each quest',
//           type: 'Support', /* Miscellaneous, Reward, etc. */
//           equipped: 'No', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         },
//         {
//           id: 2,
//           name: 'Invitation #1',
//           description: 'Piece of Paper',
//           type: 'Storyline', /* Miscellaneous, Reward, etc. */
//           equipped: 'Not Possible', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         },
//         {
//           id: 3,
//           name: 'Invitation #3',
//           description: 'Piece of Paper',
//           type: 'Storyline', /* Miscellaneous, Reward, etc. */
//           equipped: 'Not Possible', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         },
//         {
//           id: 4,
//           name: 'Lantern',
//           description: 'Lights up the righteous path',
//           type: 'Support', /* Miscellaneous, Reward, etc. */
//           equipped: 'No', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         },
//         {
//           id: 5,
//           name: 'Vision',
//           description: 'You had a vision of a goat',
//           type: 'Miscellaneous', /* Miscellaneous, Reward, etc. */
//           equipped: 'Not Possible', /* Yes, No, Not Possible */
//           img_url: '/assets/items/paper.jpg',
//           puzzle_id: null
//         }
//       ]
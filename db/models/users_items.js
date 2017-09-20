const db = require('../');

const userItems = db.Model.extend({
  tableName: 'users_items',
  user: function() {
    return this.belongsTo('Profile', 'user_id');
  },
  item: function() {
    return this.belongsTo('Items', 'item_id');
  }
});


module.exports = db.model('userItems', userItems);
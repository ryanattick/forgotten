const db = require('../');

const User = db.Model.extend({
  tableName: 'users_items'
});


module.exports = db.model('User', User);
const db = require('../');

const userStories = db.Model.extend({
  tableName: 'users_stories'
});


module.exports = db.model('userStories', userStories);
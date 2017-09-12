const expect = require('chai').expect;
const dbUtils = require('../../db/lib/utils.js');
const Items = require('../../db/models/Items.js');

describe('Item model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should be able to retrieve data from items', function(done) {
    Items.forge().fetchAll()
      .then(function(results) {
        expect(results).to.exist;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should be able to fetch items', function(done) {
    Items.where({name: 'Blue Pill'}).fetch()
      .then(function(result) {
        expect(result.attributes.name).to.equal('Blue Pill');
        done();
      });
  });

  it('should have a name, type, equippable, img_url, and puzzle_id', function(done) {
    Items.where({name: 'Blue Pill'}).fetch()
      .then(function(result) {
        expect(result.attributes.type).to.exist;
        expect(result.attributes.equippable).to.exist;
        expect(result.attributes.img_url).to.exist;
        done();
      });
  });

  it('shouldnt be able to fetch items not in the db', function(done) {
    Items.where({name: 'Red Pill'}).fetch()
      .then(function(result) {
        expect(result).to.equal(null);
        done();
      });
  });


});

// name: 'Blue Pill',
//    description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
//    type: 'Consumable',  Miscellaneous, Reward, etc.
//    equippable: 0, /* Yes, No, Not Possible */
//    img_url: '/assets/items/paper.jpg',
//    puzzle_id: null

// for (var i = 0; i < items.length; i++) {
// models.Items.forge({
//   name: items[i].name,
//   type: items[i].type,
//   equippable: items[i].equippable,
//   puzzle_id: items[i].puzzle_id,
//   description: items[i].description,
//   img_url: items[i].img_url
// }).save()
//   .error(err => {
//     console.error('ERROR: failed to create items');
//     throw err;
//   })
//   .catch(() => {
//     console.log('WARNING: defualt items already exists.');
//   });



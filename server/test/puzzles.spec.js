const expect = require('chai').expect;
const dbUtils = require('../../db/lib/utils.js');
const Puzzles = require('../../db/models/puzzles.js');


describe('Puzzles model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should be able to retrieve data from puzzles', function(done) {
    Puzzles.forge().fetchAll()
      .then(function(results) {
        expect(results).to.exist;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should be able to fetch items', function(done) {
    Puzzles.where({problem: 'There are 100 light bulbs lined up in a row in a long room. Each bulb has its own switch and is currently switched off. The room has an entry door and an exit door. There are 100 people lined up outside the entry door. Each bulb is numbered consecutively from 1 to 100. So is each person. Person No. 1 enters the room, switches on every bulb, and exits. Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6...). Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9...). This continues until all 100 people have passed through the room. What is the final state of bulb No. 64?'}).fetch()
      .then(function(result) {
        expect(result.attributes).to.exist;
        done();
      });
  });


  it('should have a problem', function(done) {
    Puzzles.where({problem: 'There are 100 light bulbs lined up in a row in a long room. Each bulb has its own switch and is currently switched off. The room has an entry door and an exit door. There are 100 people lined up outside the entry door. Each bulb is numbered consecutively from 1 to 100. So is each person. Person No. 1 enters the room, switches on every bulb, and exits. Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6...). Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9...). This continues until all 100 people have passed through the room. What is the final state of bulb No. 64?'}).fetch()
      .then(function(result) {
        expect(result.attributes.problem).to.exist;
        done();
      });
  });

  it('should have a solution', function(done) {
    Puzzles.where({problem: 'There are 100 light bulbs lined up in a row in a long room. Each bulb has its own switch and is currently switched off. The room has an entry door and an exit door. There are 100 people lined up outside the entry door. Each bulb is numbered consecutively from 1 to 100. So is each person. Person No. 1 enters the room, switches on every bulb, and exits. Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6...). Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9...). This continues until all 100 people have passed through the room. What is the final state of bulb No. 64?'}).fetch()
      .then(function(result) {
        expect(result.attributes.solution).to.exist;
        done();
      });
  });

  it('should have a fail when the problem isnt here', function(done) {
    Puzzles.where({problem: 'What kind of fish chases a cat?'}).fetch()
      .then(function(result) {
        expect(result).to.equal(null);
        done();
      });
  });


  it('should have a message pop-up', function(done) {
    Puzzles.where({problem: 'There are 100 light bulbs lined up in a row in a long room. Each bulb has its own switch and is currently switched off. The room has an entry door and an exit door. There are 100 people lined up outside the entry door. Each bulb is numbered consecutively from 1 to 100. So is each person. Person No. 1 enters the room, switches on every bulb, and exits. Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6...). Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9...). This continues until all 100 people have passed through the room. What is the final state of bulb No. 64?'}).fetch()
      .then(function(result) {

        expect(result.attributes.message_pop_up).to.exist;
        done();

        //message_pop_up: item[i].message_pop_up,
        //story_pop_up: item[i].story_pop_up,
      });
  });


  it('should have a story pop-up', function(done) {
    Puzzles.where({problem: 'There are 100 light bulbs lined up in a row in a long room. Each bulb has its own switch and is currently switched off. The room has an entry door and an exit door. There are 100 people lined up outside the entry door. Each bulb is numbered consecutively from 1 to 100. So is each person. Person No. 1 enters the room, switches on every bulb, and exits. Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6...). Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9...). This continues until all 100 people have passed through the room. What is the final state of bulb No. 64?'}).fetch()
      .then(function(result) {

        expect(result.attributes.story_pop_up).to.exist;
        done();

        //message_pop_up: item[i].message_pop_up,
        //story_pop_up: item[i].story_pop_up,
      });
  });
  // problem: 'What kind of fish chases a mouse?',
  // solution: 'Catfish'



});
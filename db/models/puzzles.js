const db = require('../');

const Puzzles = db.Model.extend({
  tableName: 'puzzles'
});


module.exports = db.model('Puzzles', Puzzles);


// What kind of fish chases a mouse?
// Catfish
// What is easy to get into, but hard to get out of?
// Trouble
// Everyone has me but no one can lose me. What am I?
// Shadow
// The more you take, the more you leave behind. What am I?
// Footsteps
// I pass before the sun, yet make no shadow. What am I?
// The wind
// When I was 10 years old, my brother was half my age. Now I am 100 years old. What’s the age of my brother right now?
// 95
// Zkdw 4-ohwwhu zrug fdq eh zulwwhq iruzdug, edfnzdug ru xsvlgh grzq, dqg fdq vwloo eh uhdg iurp ohiw wr uljkw? (What 4-letter word can be written forward, backward or upside down, and can still be read from left to right?)
// Noon (Can be used as the password to get out of the basement)
// What disappears the moment you say its name?
// Silence
// What are the three next letters in the following sequence? J, F, M, A, M, J, J, A, S,  _, _, _.
// O, N, D.
// Which is heavier? A kilogram of steel or a kilogram of feathers?
// Neither
// None
// Both weigh the same
// Which number should come next in the pattern? 37, 34, 31, 28, _.
// 25
// David’s father has three sons: Snap, Crackle and ______?
// David
// What room do ghosts avoid?
// The living room
// Living room
// living
// What gets wetter the longer it is left in the sun?
// Ice
// Everyone is attracted to me and everyone falls for me?
// Gravity

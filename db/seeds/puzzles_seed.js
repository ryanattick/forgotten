const models = require('../models');
const server = require('../../server/app');

// let username;
//
// exports.getUsername (username) => {
//   username = JSON.parse(username);
// }


exports.seed = function (knex, Promise) {


  for (var i = 0; i < item.length; i++) {
    models.Puzzles.forge({
      puzzleID: item[i].puzzleID,
      name: item[i].name,
      problem: item[i].problem,
      solution: item[i].solution,
      extra_info: item[i].extra_info,
      message_pop_up: item[i].message_pop_up,
      story_pop_up: item[i].story_pop_up,
      pop_up_image_url: item[i].pop_up_image_url
    }).save()
      .error(err => {
        console.error('ERROR: failed to create items');
        throw err;
      })
      .catch(() => {
        console.log('WARNING: default puzzle already exists.');
      });
  }
};

item = [
  {
    puzzleID: 0,
    name: null,
    problem: 'What kind of fish chases a mouse?',
    solution: 'Catfish',
    story_pop_up: 'A single overhead bulb suddenly illuminates the small, square room you find yourself in. You immediately close your eyes to the light, but you’re gradually able to open them to take in your surroundings. You’re sitting cross legged on a dirty concrete floor with the phone in your hands. There are no windows or doors that are immediately visible to you. The room is cluttered with old, cobwebbed furniture and junk. You see a table piled with books and papers a few feet away from you to your left. There are cardboard boxes piled against the wall next to to the table. To your right is a bookcase filled with more books that looks like it hasn’t been touched in years. You stand up to look behind you and you’re disappointed to see nothing but more of the cinderblock wall that encloses the room. How did you get in here? What is this place? Who’s sending you messages? You realize the phone isn’t yours. You search your pockets and you find a torn scrap of paper. “Trust me”, it says in scraggly, unfamiliar handwriting. Trust who? You look through the phone and discover that it’s completely empty except for the messages you got from the anonymous sender. You immediately try calling a few numbers from it, but a “Call Failed” message is all you get. You put the scrap of paper in your pocket and walk over to the table.',
    message_pop_up: 'Hello, Nice to see that you’re finally awake. It might be nice to see what’s going on, don’t you think? If you can solve this problem, I might be able to help you with that.',
    pop_up_image_url: null

  },
  {
    puzzleID: 1,
    name: null,
    problem: 'What is easy to get into, but hard to get out of?',
    solution: 'Trouble',
    story_pop_up: 'You wait for another message. The sender promised you would get a clue, but minutes go by and nothing. You have to get out of here. This room is starting to freak you out. Is it getting smaller? The light is definitely getting dimmer. You’re starting to worry it will go out entirely soon. You look up from the phone and frantically glance around the room. What would I find on that desk that I wouldn’t like? You start to walk toward it, but whip around when you hear a grinding noise behind you. The bookcase is no longer flush against the concrete wall. The right hand corner is now jutting away slightly at an angle. You turn in a quick circle to get a full view of the room. Someone or something must have moved it. You see nothing that could have done it, but your eyes do catch on a simple blue backpack lying in a corner. You pick it up and it feels empty. Without pausing to check, you stuff as many of the papers from the table as you can into the backpack. There’s no time. The walls are definitely getting closer to one another and the light is so faint, you can hardly see the bookshelf from across the room. You run over to it and push it further away from the wall. Relief fills you as you see a small door come into view behind it. You put on the backpack and try the knob, but it’s locked. Your heart drops. You’re going to die here. You can’t hear or see the walls move, but every time you look up they’re closer together. You hold out your arms and you can almost touch the walls on either side of you. Far too close. You start kicking the door as hard as you can. You ram your shoulder into it. You’re desperate. A vibration in your pocket stops you and you look down.',
    message_pop_up: 'I wouldn’t go that way, [player name]. You might find something you won’t like. I’ll tell you what. If you can keep solving my puzzles, I’ll do my best to help you. Trust me, you’re not going to survive this without my help. If you can get this one, I’ll give you a hint about how you can get out of this room. Be careful though. Once you start the puzzle, you’ll only have 3 minutes before the lights turn back out. For good this time.',
    pop_up_image_url: null
  },
  {
    puzzleID: 2,
    name: null,
    problem: 'Everyone has me but no one can lose me. What am I?',
    solution: 'Shadow',
    story_pop_up: 'MESSAGE: Check the backpack. It’s almost totally dark now and the walls are touching the top and ends of the bookcase. Time has run out. You swing the backpack to the ground, unzip it, and dump everything to the ground. You hear a small metallic sound to your right and you fall to your knees to frantically search that under the table which is now touching the bookcase. Your hands quickly find the object in the shrinking space. A key. You jump up and try it in the door. A fit. You quickly turn the knob and it opens! It’s too dark to see beyond the door, but you don’t care. You will die if you stay here. You’re sure of that now. You grab the backpack and shove a handful of papers back in before running out through the door. You keep running down an empty passageway dimly lit with overhead fluorescent lights every few feet. You’re starting to feel like you’re underground. What is going on. Where are you? There’s no time to think. You have to get out of this place. The vibrating phone makes you stop as you come to a fork in the passage.',
    message_pop_up: '“Careful, you’re going to hurt yourself, [player name]. Then how would you ever get out of here? You’re going to need all of your strength if you’re going to stay alive. It does look like you’re running short on time. Let me help you out.”',
    pop_up_image_url: null

  },
  {
    puzzleID: 3,
    name: null,
    problem: 'The more you take, the more you leave behind. What am I?',
    solution: 'Footsteps',
    story_pop_up: 'Now you know which way to go. Nothing has changed in the tunnel since you ran into it. You need a minute to think. You sit down with your back against the hard-packed, dirt wall of the large tunnel. You lean the backpack against one of the wooden support beams near the fork in the tunnel. [Player name]. Whoever is sending the messages keeps calling you [player name]. You close your eyes and see a person in your mind’s eye. The face and features look familiar to you, though the worried look you see isn’t as recognizable.. The person is wearing what appears to be a white lab coat. You open your eyes as you realize you don’t even know what you look like. You quickly realize you can use the phone’s camera to take a look at your own face. You take the picture and you’re astonished to realize that face in this photo is the same one your mind conjured up when you thought about the name. Your name. Maybe you’re starting to remember? Are you a doctor? A scientist? You hear a loud bang behind you, in the direction of the room. You jump up and grab your bag and start running again. Was is the room? Did it finally collapse on itself? Or was it something else? Pretty soon you come to another fork in the tunnel. This time it branches off in four different directions. You wait for the text you hope will come, but nothing comes. After a few minutes you sit down and open the backpack. You pull out the papers you managed to grab from the room. They’re crinkled and torn, and you realize, written in a strange language you’ve never seen before. The characters on the pages are completely unfamiliar to you, but you look through them anyway, curious and confused.',
    message_pop_up: '"It looks like you have a choice to make. Left or right. Maybe this will help you decide."',
    pop_up_image_url: null
  },
  {
    puzzleID: 4,
    name: null,
    problem: 'I pass before the sun, yet make no shadow. What am I?',
    solution: 'The wind',
    story_pop_up: 'You immediately want to start decoding the pages, but you decide to take inventory of your supplies first. You dump the backpack out again, gently this time and start sorting its contents on the dirt floor. You stack all of the papers with writing on them in one pile, you make another pile of blank papers, of which you grabbed quite a few, you’re disappointed to see. In an interior pocket you also find a small pocket knife and a very rotten apple. You were hoping for a pen or pencil, something to write down the decoded text with, but there is nothing else in the bag. You put the blank pages back neatly and choose a paper at random to start decoding. You use the knife to carve the decoded message in the dirt in front of you. The page you’ve chosen is not whole. The top has been torn off and what remains looks like a list of some kind with a message beneath it. Short lines of text in a vertical row. After several minutes you look back at your work. Daniel Jones, New York -M.J. Parks, Michigan Samantha Elder, California Charles Perch, New York Eaton Lang, Maine And, you, [player name]. I think you may have realized some time ago that you could be one of the few keys that remain to this solve this puzzle. We’ve been working together for some time now, my friend, and I’m sorry to have to be the one to tell you, but you need to know. You know better than most that we’re running out of time. Report back with your findings as soon as you can so the council can make a decision regarding the next phase of The message ends abruptly. You turn the page over, but there’s nothing more. Before you have time to search further, the phone in your pocket buzzes.',
    message_pop_up: '"I told you you wouldn’t like what they said, but I forgot you probably wouldn’t even remember how to read them. This make make everything a little clearer"',
    pop_up_image_url: null
  },
  {
    puzzleID: 5,
    name: null,
    problem: 'When I was 10 years old, my brother was half my age. Now I am 100 years old. What’s the age of my brother right now?',
    solution: '95',
    story_pop_up: 'Now you can finally figure out where you are. As you start looking over the map, you realize how crude and limited it is. These tunnels don’t even seem to be on it. The room isn’t there either. After a few minutes, you realize it’s not going to be much help and you put the phone away. You look down the four passages in front of you. They appear to be identical. There aren’t any clues as to which one might lead to an exit. You feel so alone. There hasn’t been a sound in the tunnels since the crashing bang you heard what feels like hours ago. None of this makes any sense and you have no idea how to figure it out. You can’t just stand there, so you start running down the tunnel the farthest to the left. It’s just as empty as the one you came from. Nothing but dirt, wood, and fluorescent lights. It’s disorienting to see nothing else for what feels like a half an hour. You almost feel like you’re running in circles. Suddenly you stop dead. You see a message carved into the ground. It looks just like the one you decoded with the knife at the fork in the passageway. “Our work has never been more important, and we’re so close. [player name], can you believe our years of hard work is finally about to pay off? We can save them. We can do this. Only a few more will have to die. When we get to the..” It looks like your handwriting, but you can’t be sure. You read through the message again. Why does your name come up so often? What had you been working on? Did you kill someone? Many people? Your mind is racing while you catch your breath and try to make sense of everything that’s happened so far. You’re scared of what might happen, of who you might be. Frustration wells up inside you at the thought of how little you know. You feel so trapped. Inside these tunnels and inside a piece of your mind that is hidden from the answers that you know are there somewhere. The phone buzzes again and you have to fight the urge to throw it as hard as you can against the wall. You don’t need another puzzle, you need answers. You open the contact information of the sender and press “Call”. (If we can’t find an auditory puzzle here is an alternative route to the story: The call is picked up on the second ring and at first you hear nothing. Then screams, faint at first, as if far away, but gradually they become louder. They’re frantic and desperate. A crowd of people begging for help and loud banging noises. As quickly as they start, the screams stop and there is nothing by silence. The call ends. A text comes in almost immediately.)',
    message_pop_up: 'You’ve been sitting around for awhile now. You need to keep moving if you’re going to make it out of here. We need you alive.',
    pop_up_image_url: null
  },
  {
    puzzleID: 6,
    name: null,
    problem: 'Find a 10-digit number where the first digit is how many zeros in the number, the second digit is how many 1s in the number etc. until the tenth digit which is how many 9s in the number.',
    solution: '6210001000',
    story_pop_up: 'MESSAGE: "Hemlock 14"  Hemlock 14. The mission. A flood of memory causes you to close your eyes almost involuntarily. You’re in a two-passenger airplane flying toward an island. You can see the outline of the compound getting closer out of the window. Each building designed exactly according to the specifications you and your team designated. It’s surreal to see it for the first time. A decade of planning and now you’re finally here. The anticipation is intense. Will you succeed? You can’t know yet, but you think you will. This can’t all have been for nothing. Your eyes snap open and it’s as if your memories have hit a wall. What was the compound built to do? You can’t remember. The memory has left you with an intense sense of purpose. You have to get out of this tunnel. You have to save those screaming people. Somehow it’s all up to you now. You start running down the passage again. Hunger has begun to gnaw at your stomach and your mouth is so dry that it hurts to draw breath as you move as quickly as you can. What if this tunnel was the wrong choice? You could die down here, you realize, and quickly without food or water. You can’t keep running down this passage forever. Although, it has to end sometime, doesn’t it? You run for what seems like an hour, though you have no way of knowing. Your legs and lungs are burning and you’re not sure how much longer you can keep going like this. You trip over something and go sprawling across the floor. Flesh grinding against the unforgiving packed dirt. You get up slowly, noting the blood now slowly seeping from a long scrape across your left calf and forearm. Cursing you limp over to the object on the ground. It’s mostly buried and you can’t immediately make out what it is. You get out the knife and begin to chip away the very solid ground around it. It’s a while  before you start to make any real progress, but when you do you realize you’re digging up a small metal lockbox. You don’t want to waste time on this if it’s nothing, but you’re lost and unsure of what else to do. You continue digging until the box can be opened. To your dismay, you see that lock requires a three digit password. It seems pretty flimsy though, so you take off one of your shoes and slam it down hard against the latch. Nothing. You try again. And again. You almost don’t notice the buzz in your pocket. ',
    message_pop_up: '“Did you hear them? Time is running out. If you want to save them you have to make it back to us. It’s all going to end so soon, [player name], with or without you. Here is your next puzzle. Good luck.”',
    pop_up_image_url: null
  },
  {
    puzzleID: 7,
    name: null,
    problem: '"five" has "fiv" in alphabetical order, but not "e".',
    solution: 'Forty',
    pop_up_image_url: null,
    story_pop_up: 'You put the code in and open the box. Inside you see a couple bottles of water, a few MRE rations, some snack bars, and a handgun. You take out the gun first, your fingers somehow know exactly how to check it for ammo and you discover it has its maximum five rounds. You hate that you’ve been in one place for so long, but you need to replenish your strength. You down half of one of the bottles of water and one of the bars, wanting to save as much as you can for later. You stuff the rest into your backpack and start moving again. You don’t spend much time thinking about how the box got into the ground. You find that you’re getting used to not knowing. Sort of. Not being able to remember more about Hemlock 14 is driving you crazy. And who were those people screaming on the phone? Your eyes scan your surroundings a little better as you run through the tunnel, not wanting to land face first in the dirt again. After a few minutes, you see it. A door. You walk up to it and try the knob. To your surprise, it turns and you begin to push it open. As you do you look ahead of you to the right and notice more doors along the tunnel in front of you. You decide to see what’s behind this one first. You push it open into what looks like someone’s bedroom, although it’s incredibly stark. There is one small, metal framed bed with a green, army-issue blanket neatly folded on top of  it to one side. Across the small room from you is a desk with several books, papers,  and writing utensils organized on it. You cross the room and take a pen, you figure it will help with decoding the other pieces of paper still in your backpack. There isn’t much of interest in the room and you see no other doors, so you walk out of the room toward the next door. As your hand reaches out for the knob, you hear the phone buzz.',
    message_pop_up: '"That is never going to work. You’re smarter than that. Although, I guess my last little clue might not have brought back enough memory to help you with that. Maybe this will."'
  },
  {
    puzzleID: 8,
    name: null,
    problem: 'David’s father has three sons: Snap, Crackle and ______?',
    solution: 'David',
    pop_up_image_url: null,
    story_pop_up: 'MESSAGE: “Charlie” The mention of his name makes you stagger away from the door. You stumble and fall to the floor as your eyes close. You’re sitting on the edge of a lake next to a little boy, he must be about four. You’re constantly amazed by him and all you feel is joy as your mind’s eye takes him in. He’s coming over to you to take a piece of bread from your hand. He laughs as he tears off a corner and throws into to the group of ducks that has gathered at the water’s edge in front of him. It’s a calm summer day and you are so happy. Your eyes snap open as you think back to the plane. You felt older in that memory and Charlie was definitely not with you. Who is he? Your son? How could you have a son and not remember him? An incredible sadness washes over you, but you don’t know why. Where is he now? Is he safe? You have to find out. You push open the door and you see a room very similar to the one you were just in. Though the bed in this room is unkempt, the blanket nearly falling off the bed in a spraw. The desk too, is covered in paper and open books. But what really catches your attention are the pictures on the wall. Nothing more than frameless prints tacked to the concrete, but nearly all of them featuring Charlie. You and Charlie. His arms reaching up to you. Charlie running next to a small brown puppy. A baby Charlie in a high chair, laughing, with something blue smeared all over his face. You look for a long time, gazing into that perfect face. You tear your eyes away for a moment to examine the desk. Most of the papers and books use that same strange code as the papers in your backpack, but a black and white photo catches his attention. It looks like it it was cut from a newspaper. It’s a shot of a tombstone. The text carved into it reads: Charles Milo Ender, Beloved. You sink into the chair next to the desk. No. This can’t be him. It can’t. You sit there a long time. You can’t move. You can’t breathe. Then you remember the last message you received. “ If you don’t hurry we are all going to die. Every single one of us. Including him.” Could he be alive? What is happening? If you could only remember. The frustration starts taking over again and you throw your head back in rage. When you do, you notice something on the ceiling. A trapdoor. Is this a way out? You scramble on top of the chair and you can barely reach the latch. It won’t budge. You see an alphabetic keypad next to the latch. You immediately type in “Charlie” but the light beside the buttons stays red. The phone you left on the desk buzzes. You jump down from the chair to the pictures on the wall and pull them down. You put them in your backpack along with a handful of pages from the desk, including the picture of the headstone. Then you pick up the phone.',
    message_pop_up: '“There is something you need to know before you open that door. A memory that will be painful to restore. I’m sorry, [player name], but it will be easier this way. Once you open that door, remember this. If you don’t hurry we are all going to die. Every single one of us. Including him.” '
  },
  {
    puzzleID: 9,
    name: null,
    problem: 'Everyone is attracted to me and everyone falls for me?',
    solution: 'Gravity',
    story_pop_up: 'The mention of his name makes you stagger away from the door. You stumble and fall to the floor as your eyes close. You’re sitting on the edge of a lake next to a little boy, he must be about four. You’re constantly amazed by him and all you feel is joy as your mind’s eye takes him in. He’s coming over to you to take a piece of bread from your hand. He laughs as he tears off a corner and throws into to the group of ducks that has gathered at the water’s edge in front of him. It’s a calm summer day and you are so happy. Your eyes snap open as you think back to the plane. You felt older in that memory and Charlie was definitely not with you. Who is he? Your son? How could you have a son and not remember him? An incredible sadness washes over you, but you don’t know why. Where is he now? Is he safe? You have to find out. You push open the door and you see a room very similar to the one you were just in. Though the bed in this room is unkempt, the blanket nearly falling off the bed in a spraw. The desk too, is covered in paper and open books. But what really catches your attention are the pictures on the wall. Nothing more than frameless prints tacked to the concrete, but nearly all of them featuring Charlie. You and Charlie. His arms reaching up to you. Charlie running next to a small brown puppy. A baby Charlie in a high chair, laughing, with something blue smeared all over his face. You look for a long time, gazing into that perfect face. You tear your eyes away for a moment to examine the desk. Most of the papers and books use that same strange code as the papers in your backpack, but a black and white photo catches his attention. It looks like it it was cut from a newspaper. It’s a shot of a tombstone. The text carved into it reads: Charles Milo Ender, Beloved. You sink into the chair next to the desk. No. This can’t be him. It can’t. You sit there a long time. You can’t move. You can’t breathe. Then you remember the last message you received. “ If you don’t hurry we are all going to die. Every single one of us. Including him.” Could he be alive? What is happening? If you could only remember. The frustration starts taking over again and you throw your head back in rage. When you do, you notice something on the ceiling. A trapdoor. Is this a way out? You scramble on top of the chair and you can barely reach the latch. It won’t budge. You see an alphabetic keypad next to the latch. You immediately type in “Charlie” but the light beside the buttons stays red. The phone you left on the desk buzzes. You jump down from the chair to the pictures on the wall and pull them down. You put them in your backpack along with a handful of pages from the desk, including the picture of the headstone. Then you pick up the phone.',
    message_pop_up: '"I’m sorry I can’t tell you more. You wouldn’t want me to. I no longer need to convey to you what’s at stake. Solve this puzzle and hurry to us."',
    pop_up_image_url: null
  }

];

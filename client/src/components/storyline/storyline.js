// React
import React from 'react';

// Helpers
import Request from '../../../../helpers/requests';

// Styling
import styles from '../../../../styles/storyline/storyline.css';

// Material UI
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class Storyline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyline: []
    };
  }

  componentWillMount() {
    // Grab stories from users_stories table - puzzles table - pop up stories and messages
    Request.get('/userStoryline', (data) => {
      // data is an array of objects containing stories and messages and items
      var initialStory = 'Your head is pounding. You reach up to touch it and as you do you realize you can’t tell if your eyes are open or closed. This startles you and you freeze. Where are you? You don’t know. Who are you? You can’t remember. Your heart starts racing as panic creeps in, slowly at first and then all at once. You take a breath and try to think back. How did you get here? Where is here? You decide to take things one step at a time. What is your name? As soon as that thought enters your mind you feel a vibration in your pocket.';
      if (data.storyline.length !== 0) {
        data.storyline.unshift({story: initialStory});
      }
      var username = data.name;
      var storyline = data.storyline;
      var chronologicalOrder = [];
      for (var i = 0; i < storyline.length; i++) {
        if (storyline[i].message) {
          var messageText = '';
          if (username) {
            messageText = storyline[i].message.replace('[playerName]', username);
          } else {
            messageText = storyline[i].message.replace('[playerName]', 'friend');
          }
          let domMessage = <div className={styles.message}>{messageText}</div>;
          chronologicalOrder.push(domMessage);
        }
        if (storyline[i].story) {
          var storyText = '';
          if (username) {
            storyText = storyline[i].story.replace('[playerName]', username);
          } else {
            storyText = storyline[i].story.replace('[playerName]', 'friend');
          }
          let domStory = <div className={styles.story}>{storyText}</div>;
          chronologicalOrder.push(domStory);
        }
        if (storyline[i].items && storyline[i].items.length > 0 && storyline[i].items[0].length > 0) {
          var receivedItems = 'You received: ';

          for (var k = 0; k < storyline[i].items[0].length; k++) {
            if (k === storyline[i].items[0].length - 1) {
              receivedItems += storyline[i].items[0][k] + '.';
            } else {
              receivedItems += storyline[i].items[0][k] + ', ';
            }
          }
          let domItems = <div className={styles.notifications}>{receivedItems}</div>;
          chronologicalOrder.push(domItems);
        }
      }

      this.setState({
        storyline: chronologicalOrder
      });
    });
  }

  render() {

    let emptyStoryline = <div className={styles.empty_storyline_container}>
      <div className={styles.empty_storyline_content}>
        Your story is yet to begin! Start by clicking on the first map.
      </div>
    </div>;

    let fullStoryline = <div className={styles.storyline}>
      {this.state.storyline.map((element, id) => (
        <div key={id} className={styles.listItem}>{element}</div>
      ))}
    </div>;

    let storylineDisplay = this.state.storyline.length === 0 ? emptyStoryline : fullStoryline;

    return (
      <div className={styles.storyline_container}>
        {storylineDisplay}
      </div>
    );
  }
}

export default Storyline;

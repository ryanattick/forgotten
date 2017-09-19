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
    }
  }

  componentWillMount() {
    // Grab stories from users_stories table - puzzles table - pop up stories and messages
    Request.get('/userStoryline', (data) => {
      // data is an array of objects containing stories and messages and items
      var chronologicalOrder = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].story) {
          let domStory = <div className={styles.story}>{data[i].story}</div>;
          chronologicalOrder.push(domStory);
        }
        if (data[i].message) {
          let domMessage = <div className={styles.message}>{data[i].message}</div>
          chronologicalOrder.push(domMessage);
        }
        if (data[i].items && data[i].items.length > 0) {
          var receivedItems = 'You received: ';

          for (var k = 0; k < data[i].items.length; k++) {
            if (k === data[i].items.length - 1) {
              receivedItems += data[i].items[k] + '.';
            } else {
              receivedItems += data[i].items[k] + ', ';
            }
          }
          let domItems = <div className={styles.notifications}>{receivedItems}</div>
          chronologicalOrder.push(domItems);
        }
      }
      this.setState({
        storyline: chronologicalOrder
      });
    });
  }

  render() {
    return (
      <div className={styles.storyline_container}>
        <div className={styles.storyline}>
          {this.state.storyline.map((element, id) => (
            <div key={id} className={styles.listItem}>{element}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Storyline;

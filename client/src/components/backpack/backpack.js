// React & Other
import React from 'react';
import $ from 'jquery';

// Components
import Items from './items.js';
import Profile from './profile.js';

// Styling
import styles from '../../../../styles/backpack/backpack.css';

// Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// TODO: Make it so items are retrieved from DB in alphabetical order
// TODO: retrieve filters from db

// Sample Items table data
// id
// name
// description
// img_url
// user_id
// puzzle_id
// equipped

class Backpack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          name: 'Blue Pill',
          description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
          type: 'Consumable', /* Miscellaneous, Reward, etc. */
          equipped: 'Not Possible', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        },
        {
          id: 1,
          name: 'Guide Book #1',
          description: 'This edition of the Guide Book allows you to have a free hint on each quest',
          type: 'Support', /* Miscellaneous, Reward, etc. */
          equipped: 'No', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        },
        {
          id: 2,
          name: 'Invitation #1',
          description: 'Piece of Paper',
          type: 'Storyline', /* Miscellaneous, Reward, etc. */
          equipped: 'Not Possible', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        },
        {
          id: 3,
          name: 'Invitation #3',
          description: 'Piece of Paper',
          type: 'Storyline', /* Miscellaneous, Reward, etc. */
          equipped: 'Not Possible', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        },
        {
          id: 4,
          name: 'Lantern',
          description: 'Lights up the righteous path',
          type: 'Support', /* Miscellaneous, Reward, etc. */
          equipped: 'No', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        },
        {
          id: 5,
          name: 'Vision',
          description: 'You had a vision of a goat',
          type: 'Miscellaneous', /* Miscellaneous, Reward, etc. */
          equipped: 'Not Possible', /* Yes, No, Not Possible */
          img_url: '/assets/items/paper.jpg',
          puzzle_id: null
        }
      ],
      filters: [
        'Name',
        'Support',
        'Storyline',
        'Consumable',
        'Miscellaneous'
      ],
      open: false,
      popUpItem: {}
    };

    this.openItemPopUp = this.openItemPopUp.bind(this);
    this.closeItemPopUp = this.closeItemPopUp.bind(this);
  }

  openItemPopUp(item) {
    this.setState({
      open: true,
      popUpItem: item
    });
  }

  closeItemPopUp() {
    this.setState({
      open: false,
      popUpItem: {}
    });
  }

  componentWillMount() {
    // $.ajax({
    //   url: '/backpack_items',
    //   type: 'GET',
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     });
    //   },
    //   error: (data) => {
    //     console.log('GET request unsuccessful');
    //   }
    // });
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeItemPopUp}
      />
    ];

    return (
      <div>
        <Profile />
        <Items items={this.state.items} filters={this.state.filters} openItemPopUp={this.openItemPopUp}/>
        <Dialog
          titleClassName={styles.item_popup_title}
          title={this.state.popUpItem.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeItemPopUp}>
          <div className={styles.item_popup_content}>
            <img src={this.state.popUpItem.img_url}/>
            <div>{this.state.popUpItem.description}</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Backpack;

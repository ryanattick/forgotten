import React from 'react';
import Items from './items.js';
import Profile from './profile.js';

// TODO: Make it so items are retrieved from DB in alphabetical order
// TODO: retrieve filters from db
// Sample data
var filters = [
  'Name',
  'Support',
  'Storyline',
  'Consumable',
  'Miscellaneous'
];

class Backpack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          name: 'Blue Pill',
          description: 'Consuming this pill increases the timer on the next quest by 30 seconds',
          type: 'Consumable' /* Miscellaneous, Reward, etc. */,
          equipped: 'Not Possible' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        },
        {
          id: 1,
          name: 'Guide Book #1',
          description: 'This edition of the Guide Book allows you to have a free hint on each quest',
          type: 'Support' /* Miscellaneous, Reward, etc. */,
          equipped: 'No' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        },
        {
          id: 2,
          name: 'Invitation #1',
          description: 'Piece of Paper',
          type: 'Storyline' /* Miscellaneous, Reward, etc. */,
          equipped: 'Not Possible' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        },
        {
          id: 3,
          name: 'Invitation #3',
          description: 'Piece of Paper',
          type: 'Storyline' /* Miscellaneous, Reward, etc. */,
          equipped: 'Not Possible' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        },
        {
          id: 4,
          name: 'Lantern',
          description: 'Lights up the righteous path',
          type: 'Support' /* Miscellaneous, Reward, etc. */,
          equipped: 'No' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        },
        {
          id: 5,
          name: 'Vision',
          description: 'You had a vision of a goat',
          type: 'Miscellaneous' /* Miscellaneous, Reward, etc. */,
          equipped: 'Not Possible' /* Yes, No, Not Possible */,
          user_id: 0 /* References a user */
        }
      ],
      filters: []
    };
  }

  componentWillMount() {
    // Retrieve a list of all filter options
    this.setState({
      filters: filters
    });
  }

  render() {

    return (
      <div>
        <Profile />
        <Items items={this.state.items} filters={this.state.filters}/>
      </div>
    );
  }
}

export default Backpack;

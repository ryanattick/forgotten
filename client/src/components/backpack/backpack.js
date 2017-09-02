import React from 'react';
import Items from './items.js';
import Profile from './profile.js';

class Backpack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {

    return (
      <div>
        <Profile />
        <Items items={this.state.items} />
      </div>
    );
  }
}

export default Backpack;

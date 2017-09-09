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

// Helpers
import Request from '../../../../helpers/requests';

class Backpack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
    Request.get('/playerItems', (data) => {
      this.setState({
        items: data
      });
    });
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
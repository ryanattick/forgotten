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
    this.handleConsumeItem = this.handleConsumeItem.bind(this);
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

  handleConsumeItem(itemID) {
    // Request.post('/remove')
    // var updatedItemsList = this.state.items.slice(0);
    // for (var i = 0; i < updatedItemsList.length; i++) {
    //   if (updatedItemsList[i].id === itemID) {
    //     updatedItemsList.splice(i, 1);
    //     break;
    //   }
    // }
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
          paperClassName={styles.item_popup_dialog_box}
          title={this.state.popUpItem.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeItemPopUp}>
          <div className={styles.item_popup_content}>
            <img src={this.state.popUpItem.img_url}/>
            <div className={styles.extrainfo}>
              <div><span className={styles.extrainfo_subtitles}>Item:</span> {this.state.popUpItem.name}</div>
              <div><span className={styles.extrainfo_subtitles}>Description:</span> {this.state.popUpItem.description}</div>
              <div><span className={styles.extrainfo_subtitles}>Type:</span> {this.state.popUpItem.type}</div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Backpack;

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
      openInspect: false,
      openInformUserFullLivesPopUp: false,
      openItemConsumedPopUp: false,
      openItemEquipped: false,
      openItemAlreadyEquipped: false,
      popUpItem: {}
    };

    this.openItemPopUp = this.openItemPopUp.bind(this);
    this.closeItemPopUp = this.closeItemPopUp.bind(this);
    this.handleConsumeItem = this.handleConsumeItem.bind(this);
    this.handleEquipItem = this.handleEquipItem.bind(this);
  }

  handleEquipItem(item) {
    var postObject = {
      itemID: item.id
    }
    Request.post('/equipItem', postObject, (data) => {
      if ((data).toLowerCase() === ('already equipped').toLowerCase()) {
        // item already equipped
        this.openItemPopUp(item, 'openItemAlreadyEquipped');
      } else {
        this.openItemPopUp(item, 'openItemEquipped');
      }
    });
  }

  openItemPopUp(item, popUpType) {
    if (popUpType) {
      if (popUpType.toLowerCase() === ('openInformUserFullLivesPopUp').toLowerCase()) {
        this.setState({
          openInformUserFullLivesPopUp: true,
          popUpItem: item
        });
      } else if (popUpType.toLowerCase() == ('openItemConsumedPopUp').toLowerCase()) {
        this.setState({
          openItemConsumedPopUp: true,
          popUpItem: item
        })
      } else if (popUpType.toLowerCase() == ('openItemEquipped').toLowerCase()) {
        this.setState({
          openItemEquipped: true,
          popUpItem: item
        })
      } else if (popUpType.toLowerCase() == ('openItemAlreadyEquipped').toLowerCase()) {
        this.setState({
          openItemAlreadyEquipped: true,
          popUpItem: item
        })
      }
    } else {
      this.setState({
        openInspect: true,
        popUpItem: item
      });
    }
  }

  closeItemPopUp() {
    if (this.state.openInspect) {
      this.setState({
        openInspect: false,
        popUpItem: {}
      });
    } else if (this.state.openInformUserFullLivesPopUp) {
      this.setState({
        openInformUserFullLivesPopUp: false,
        popUpItem: {}
      });
    } else if (this.state.openItemConsumedPopUp) {
      this.setState({
        openItemConsumedPopUp: false,
        popUpItem: {}
      });
    } else if (this.state.openItemEquipped) {
      this.setState({
        openItemEquipped: false,
        popUpItem: {}
      });
    } else if (this.state.openItemAlreadyEquipped) {
      this.setState({
        openItemAlreadyEquipped: false,
        popUpItem: {}
      });
    }
  }

  componentWillMount() {
    Request.get('/playerItems', (data) => {
      this.setState({
        items: data
      });
    });
  }

  handleConsumeItem(item) {
    var postObject = {
      itemID: item.id
    }
    Request.post('/consumeItem', postObject, (data) => {

      if (data.toLowerCase() === 'not possible') {

        this.openItemPopUp(item, 'openInformUserFullLivesPopUp');

      } else {
        this.openItemPopUp(item, 'openItemConsumedPopUp');
        var updatedItemsList = this.state.items.slice(0);
        for (var i = 0; i < updatedItemsList.length; i++) {
          if (updatedItemsList[i].id === item.id) {
            updatedItemsList.splice(i, 1);
            break;
          }
        }

        this.setState({
          items: updatedItemsList
        });
      }
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
    let itemEffect = <div></div>;
    // display effect in item pop up if effect is not null
    if (this.state.popUpItem.effect) {
      itemEffect = <div><span className={styles.extrainfo_subtitles}>Effect:</span> {this.state.popUpItem.effect}</div>;
    }
    return (
      <div>
        <Profile />
        <Items
          items={this.state.items}
          filters={this.state.filters}
          openItemPopUp={this.openItemPopUp}
          handleConsumeItem={this.handleConsumeItem}
          handleEquip={this.handleEquipItem}/>
          <Dialog
            titleClassName={styles.item_popup_title}
            paperClassName={styles.item_popup_dialog_box}
            title={this.state.popUpItem.name}
            actions={actions}
            modal={false}
            open={this.state.openInspect}
            onRequestClose={this.closeItemPopUp}>
            <div className={styles.item_popup_content}>
              <img src={this.state.popUpItem.img_url}/>
              <div className={styles.extrainfo}>
                <div><span className={styles.extrainfo_subtitles}>Item:</span> {this.state.popUpItem.name}</div>
                <div><span className={styles.extrainfo_subtitles}>Description:</span> {this.state.popUpItem.description}</div>
                <div><span className={styles.extrainfo_subtitles}>Type:</span> {this.state.popUpItem.type}</div>
                {itemEffect}
              </div>
            </div>
          </Dialog>
          <Dialog
            titleClassName={styles.item_popup_title}
            paperClassName={styles.item_popup_dialog_box}
            title={this.state.popUpItem.name}
            actions={actions}
            modal={false}
            open={this.state.openInformUserFullLivesPopUp}
            onRequestClose={this.closeItemPopUp}>
            <div className={styles.item_popup_content}>
              <img src={this.state.popUpItem.img_url}/>
              <div className={styles.extrainfo}>
                {itemEffect}
                <div><span className={styles.extrainfo_subtitles}>Can't consume:</span> You already have 5 lives!</div>
              </div>
            </div>
          </Dialog>
          <Dialog
            titleClassName={styles.item_popup_title}
            paperClassName={styles.item_popup_dialog_box}
            title={this.state.popUpItem.name}
            actions={actions}
            modal={false}
            open={this.state.openItemConsumedPopUp}
            onRequestClose={this.closeItemPopUp}>
            <div className={styles.item_popup_content}>
              <img src={this.state.popUpItem.img_url}/>
              <div className={styles.extrainfo}>
                {itemEffect}
                <div><span className={styles.extrainfo_subtitles}>Item consumed:</span> You have gained a life!</div>
              </div>
            </div>
          </Dialog>
          <Dialog
            titleClassName={styles.item_popup_title}
            paperClassName={styles.item_popup_dialog_box}
            title={this.state.popUpItem.name}
            actions={actions}
            modal={false}
            open={this.state.openItemEquipped}
            onRequestClose={this.closeItemPopUp}>
            <div className={styles.item_popup_content}>
              <img src={this.state.popUpItem.img_url}/>
              <div className={styles.extrainfo}>
                {itemEffect}
                <div><span className={styles.extrainfo_subtitles}>Item successfully equipped!</span></div>
              </div>
            </div>
          </Dialog>
          <Dialog
            titleClassName={styles.item_popup_title}
            paperClassName={styles.item_popup_dialog_box}
            title={this.state.popUpItem.name}
            actions={actions}
            modal={false}
            open={this.state.openItemAlreadyEquipped}
            onRequestClose={this.closeItemPopUp}>
            <div className={styles.item_popup_content}>
              <img src={this.state.popUpItem.img_url}/>
              <div className={styles.extrainfo}>
                {itemEffect}
                <div><span className={styles.extrainfo_subtitles}>This item is already equipped!</span></div>
              </div>
            </div>
          </Dialog>
        </div>
      );
    }
  }

  export default Backpack;

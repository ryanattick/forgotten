import React from 'react';
import Path from 'path';

// Material UI
import { GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
import PanToolIcon from 'material-ui/svg-icons/action/pan-tool';
import ConsumeIcon from 'material-ui/svg-icons/maps/restaurant';

// Styling
import styles from '../../../../styles/backpack/item.css';

const Item = (props) => {

  let iconButtonEquip = <div></div>;

  if (props.item.equippable) {
    iconButtonEquip = <IconButton tooltip='Equip' tooltipPosition='top-left'><PanToolIcon color="white" /></IconButton>;
  } else if (props.item.type === 'Consumable') {
    iconButtonEquip = <IconButton tooltip='Consume' tooltipPosition='top-left'><ConsumeIcon color="white" /></IconButton>;
  }

  var handleItemPopup = () => {
    props.openItemPopUp(props.item);
  };

  return (
    <GridTile
      className={styles.item_tile}
      title={props.item.name}
      subtitle={<span><b>{props.item.description}</b></span>}
      actionIcon={iconButtonEquip}
      style={{backgroundImage: `url(${props.item.img_url})`, backgroundSize: 'cover'}}>
      <IconButton className={styles.inspect_button} tooltip='Inspect' tooltipPosition='bottom-right' onClick={handleItemPopup}><InfoIcon color="white" /></IconButton>
    </GridTile>
  );
};

export default Item;

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
      >
      <IconButton
        className={styles.inspect_button}
        tooltip='Inspect'
        tooltipPosition='bottom-right'
        onClick={handleItemPopup}>
        <InfoIcon color="white" />
      </IconButton>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{stroke: 'none'}}>
        <path d="M0 0h512v512H0z" fill="#44BBA4"></path>
        <g className="" transform="translate(0,0)">
          <path fill="#F6F7EB" d="M210.28 18.344c-21.362 43.312-84.904 72.3-146.968 101.78L181.22 156.94 54.312 142.5c28.592 58.053 71.69 113.348 120.968 157.75l99.314 29.906L179 323.312c-35.158 32.766-95.2 70.74-161.5 91.782 88.447 40.53 161.28 46.956 280.344 77.25C378.36 453.12 415.57 425.644 470.094 382l-149.25-42.438 147.47 18.938c-49.763-45.25-89.572-102.69-115.47-161.438L227.53 165.125l141.064 13.594c55.096-20.42 85.08-49.28 124.53-102.282-97.707-20.988-177.93-45.69-282.843-58.094z"></path>
        </g>
      </svg>
    </GridTile>
  );
};

export default Item;

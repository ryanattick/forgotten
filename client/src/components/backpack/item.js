import React from 'react';

// Material UI
import { GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';

const Item = (props) => {
  return (
    <GridTile
      title={props.item.name}
      subtitle={<span><b>{props.item.description}</b></span>}
      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
    </GridTile>
  );
};

export default Item;

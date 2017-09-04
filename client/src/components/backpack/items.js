import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      itemsToDisplay: this.props.items,
      filterIndex: 0,
      filters: this.props.filters,
      searchTerm: ''
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleFilterChange(event, index, value) {
    this.setState({
      filterIndex: index
    }, () => {
      var display = [];
      for (var i = 0; i < this.state.items.length; i++) {
        if (event.target.innerHTML === 'Name') {
          display = this.state.items;
          break;
        } else if (this.state.items[i].type === event.target.innerHTML) {
          display.push(this.state.items[i]);
        }
      }
      this.setState({
        itemsToDisplay: display
      });
    });
  }

  handleSearchChange(input) {
    this.setState({
      searchTerm: input
    });
  }

  render() {

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <AutoComplete
              hintText='Search in a name of an item'
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.items}
              onUpdateInput={this.handleSearchChange}>
            </AutoComplete>
          </ToolbarGroup>
          <ToolbarGroup>
            <SelectField
              floatingLabelText='Filter by'
              value={this.state.filterIndex}
              onChange={this.handleFilterChange}>
              {this.state.filters.map((filter, id) => (
                <MenuItem key={id} value={id} primaryText={filter}/>
              ))}
            </SelectField>
          </ToolbarGroup>
        </Toolbar>
        <GridList
          cellHeight={180}
          cols={4}
          padding={50}>
          {this.state.itemsToDisplay.map((item, id) => (
            <GridTile
              key={id}
              title={item.title}
              subtitle={<span><b>{item.description}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Items;

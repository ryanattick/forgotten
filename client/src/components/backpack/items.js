import React from 'react';

// Material UI
import { GridList } from 'material-ui/GridList';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// Components
import Item from './item.js';

// Styling
import styles from '../../../../styles/backpack/items.css';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsToDisplay: [],
      filterIndex: 0,
      filters: this.props.filters,
      searchTerm: ''
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleItemPopup = this.handleItemPopup.bind(this);
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

  handleSearchChange(event, newValue) {
    this.setState({
      searchTerm: newValue
    }, () => {
      var display = [];
      var searchText = newValue.toUpperCase();
      var allItems = this.state.items;
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].name.toUpperCase().includes(newValue.toUpperCase())) {
          display.push(this.state.items[i]);
        }
      }
      this.setState({
        itemsToDisplay: display
      });
    });
  }

  handleItemPopup(item) {
    this.props.openItemPopUp(item);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        items: nextProps.items,
        itemsToDisplay: nextProps.items
      });
    }
  }

  render() {

    return (
      <div className={styles.toolbar_container}>

        <Toolbar className={styles.toolBar}>

          <ToolbarGroup>
            <TextField
              floatingLabelText='Search by name'
              onChange={this.handleSearchChange}
              floatingLabelFocusStyle={{color: '#E94F37'}}
              underlineFocusStyle={{borderColor: '#E94F37'}}/>
          </ToolbarGroup>

          <ToolbarGroup>
            <SelectField
              floatingLabelText='Filter by type'
              value={this.state.filterIndex}
              onChange={this.handleFilterChange}
              selectedMenuItemStyle={{color: '#E94F37'}}>
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
            <Item key={id} item={item} openItemPopUp={this.handleItemPopup} handleConsumeItem={this.props.handleConsumeItem} handleEquip={this.props.handleEquip}/>
          ))}
        </GridList>

      </div>
    );
  }
}

export default Items;

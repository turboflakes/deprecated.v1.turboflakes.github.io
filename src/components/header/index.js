import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuDialog from '../dialogs/menu_dialog';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Header extends Component {

  state = {
    open: false,
  }

  render() {
    const { classes} = this.props;
		
		return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <Toolbar variant="dense" className={classes.toolBar}>
            <div className={classes.grow} />
              <IconButton 
                onClick={() => this.setState({open: true})}
                style={this.state.open ? {visibility: "hidden"} : null}
                color="default"
                aria-label="Menu">
                <MenuIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
        <MenuDialog 
          open={this.state.open}
          onClose={()=>this.setState({open: false})}/>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

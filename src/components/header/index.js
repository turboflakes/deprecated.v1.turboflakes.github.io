import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Header extends Component {

  render() {
    const { classes} = this.props;
		
		return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <Toolbar variant="dense" className={classes.toolBar}>
            {/* Logo */}
            <Typography variant="h2" className={classes.title}>
              TURBOFLAKES
            </Typography>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Header));

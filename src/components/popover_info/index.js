import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'


class PopoverInfo extends Component {
  
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <span className={classes.root}>
        <IconButton
          aria-describedby={open ? 'popover-info-pep' : undefined} 
          onClick={this.handleClick}
          classes={{
            root: classes.iconRoot
          }}>
          <InfoIcon />
        </IconButton>
        <Popover
          id={"popover-info-pep"}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
        >
          {this.props.children}
        </Popover>
      </span>
    );
  }
}

PopoverInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(PopoverInfo));
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Link from '@material-ui/core/Link';
import ClearIcon from '@material-ui/icons/Clear';
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
    const { classes, isFetching, linkComponent } = this.props
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <span className={classes.root}>
        {linkComponent ? 
        <Link color="inherit" onClick={this.handleClick}>
          {linkComponent}
        </Link>
         : 
            <IconButton
            aria-describedby={open ? 'popover-info-pep' : undefined} 
            disabled={isFetching}
            onClick={this.handleClick}
            classes={{
              root: classes.iconRoot,
              ...this.props.iconClasses
            }}>
            <InfoIcon />
          </IconButton>
        }
        <Popover
          id={"popover-info-pep"}
          className={classes.popover}
          elevation={0}
          classes={{
            paper: classes.paper,
            ...this.props.popoverClasses
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
          <IconButton aria-label="Close"
            className={classes.closeButton}
            onClick={this.handleClose}>
            <ClearIcon />
          </IconButton>
          {this.props.children}
        </Popover>
      </span>
    );
  }
}

PopoverInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  popoverClasses: PropTypes.object
};

export default withWidth()(withStyles(styles)(PopoverInfo));
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'


class PopoverWeight extends Component {
  
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
        <Link color="inherit" onClick={this.handleClick}>
          <u>weights</u>
        </Link>
        <Popover
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
          <Typography variant="body2" color="inherit" paragraph>
            Weights are personal preferences and define the level of importance towards a specific trait.
          </Typography>
          <Typography variant="body2" color="inherit" >
            The weight scale is defined in a 10-point ordinal scale. e.g:
          </Typography>
          <Typography variant="body2" color="inherit" className={classes.list}>
          0 = Not Applicable
          </Typography>
          <Typography variant="body2" color="inherit" className={classes.list}>
          1 = Less Important
          </Typography>
          <Typography variant="body2" color="inherit" className={classes.list}>
          5 = Moderately Important
          </Typography>
          <Typography variant="body2" color="inherit" className={classes.list} gutterBottom>
          10 = Very Important
          </Typography>
          <Typography variant="body2" color="inherit" gutterBottom>
            Note: If you do not want a specific trait to interfer in the final score, you have the option to select <b className={classes.bold}>0 - Not Applicable</b>. 
          </Typography>
        </Popover>
      </span>
    );
  }
}

PopoverWeight.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PopoverWeight);
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'


class PopoverWeightInfo extends Component {
  
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
          <Typography variant="h6">
          Weight Scale
          </Typography>
          <Typography variant="body1" gutterBottom>
            Weights are personal preferences. Weights define the level of importance an Individual's have towards a specific trait. Everyone can assign his/her own weights to each trait. An individual's weighting preferences are kept intact, they are not averaged or blended with other individual's weights.
          </Typography>
          <Typography variant="subtitle1">
            Weight scale is defined in a 10-point ordinal scale. e.g:
          </Typography>
          <Typography variant="body1" className={classes.list}>
          0 = Not Applicable
          </Typography>
          <Typography variant="body1" className={classes.list}>
          1 = Less Important
          </Typography>
          <Typography variant="body1" className={classes.list}>
          5 = Moderately Importatnt
          </Typography>
          <Typography variant="body1" className={classes.list}>
          10 = Very Important
          </Typography>
          <Typography variant="body1" className={classes.list} gutterBottom>
            Note: If you do not want a specific trait to interfer in the final score, you have the option to select <b className={classes.bold}>0 - Not Applicable</b>. 
          </Typography>
        </Popover>
      </span>
    );
  }
}

PopoverWeightInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles)(PopoverWeightInfo));
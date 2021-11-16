import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {clearALL} from '../../actions/notification';
import AlertBase from './alert_base';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Alert extends Component {

  renderDismissAll() {
    const { classes } = this.props;
    return (
      <AlertBase notification={{severity: "info"}}
        action={
          <Link component="button" color="inherit" underline="always"
            onClick={() => this.props.clearALL()}>
            Remove all notifications
          </Link>
        }
        icon={<CloseIcon fontSize="inherit" />}
        className={classes.clear}
      />
    )
  }

 	render() {
		const { classes, notifications } = this.props;
    return (
      <div className={classes.root}>
        {notifications.length > 1 ? this.renderDismissAll() : null}
        {notifications.map((notification, index) => 
          <AlertBase key={index} notification={notification} delay={notification.delay} />)}
      </div>
    )
	}
}

Alert.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({ notifications: state.notifications })

export default connect(mapStateToProps, {clearALL})(withStyles(styles)(Alert));
  
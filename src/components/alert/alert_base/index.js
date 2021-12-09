import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _delay from 'lodash/delay'
import { remove } from '../../../actions/notification'
import AlertBase from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Alert extends Component {

  componentDidMount = () => {
    const {notification, delay} = this.props
    if (!!delay) {
      _delay((id) => this.props.remove(id), delay, notification.id)
    }
  }
  
  renderUrl() {
    const { notification } = this.props;
    return (
      <Typography variant="inherit">
        {notification.msg} (<Link href={notification.url.href} underline="always" 
          target="_blank" rel="noreferrer" color="inherit" >{notification.url.text}</Link>)
      </Typography>
    )
  }

  render() {
		const { classes, notification, ...props } = this.props;
    return (
      <AlertBase className={classes.root}
        severity={!!notification.severity ? notification.severity : ""}
        onClose={() => this.props.remove(notification.id)}
        {...props}
      >
        {!!notification.url ? this.renderUrl() : notification.msg}
      </AlertBase>
    )
    
	}
}

Alert.propTypes = {
	classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({})

export default connect(mapStateToProps, { remove })(withStyles(styles)(Alert));
  
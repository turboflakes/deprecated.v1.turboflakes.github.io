import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { remove } from '../../actions/error'
import AlertBase from './alert_base';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Alert extends Component {

 	render() {
		const { classes, errors } = this.props;
    return (
      <div className={classes.root}>
        {errors.map((error, index) => <AlertBase key={index} error={error} />)}
      </div>
    )
	}
}

Alert.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { remove })(withStyles(styles)(Alert));
  
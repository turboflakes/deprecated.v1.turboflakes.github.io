import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { remove } from '../../actions/error'
import AlertBase from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Alert extends Component {

	handleClear = () => {
    this.props.clearAddress()
  }

  renderError = (msg, index) => {
    const { classes } = this.props;
    return (
      <AlertBase className={classes.alert}
        severity="error"
        onClose={() => this.props.remove(index)}
      >
        {msg}
      </AlertBase>
    )
  }

 	render() {
		const { classes, errors } = this.props;

    return (
      <div className={classes.root}>
        {errors.map((msg, index) => this.renderError(msg, index))}
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
  
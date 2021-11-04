import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _delay from 'lodash/delay'
import { remove } from '../../../actions/error'
import AlertBase from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Alert extends Component {

  componentDidMount = () => {
    const {error} = this.props
    _delay((id) => this.props.remove(id), 5000, error.id)
  }

  render() {
		const { classes, error } = this.props;
    return (
      <AlertBase className={classes.alert}
        severity={!!error.severity ? error.severity : "error"}
        onClose={() => this.props.remove(error.id)}
      >
        {error.msg}
      </AlertBase>
    )
    
	}
}

Alert.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({})

export default connect(mapStateToProps, { remove })(withStyles(styles)(Alert));
  
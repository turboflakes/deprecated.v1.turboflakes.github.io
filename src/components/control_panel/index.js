import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
// import { change } from '../../actions/weight'
// import { selectors } from '../../selectors'
// import Typography from '@material-ui/core/Typography';
import WeightSlider from '../weight_slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

/// Position 0 - Higher Inclusion rate is preferrable
/// Position 1 - Lower Commission is preferrable
/// Position 2 - Higher Reward Points is preferrable
/// Position 3 - If reward is staked is preferrable
/// Position 4 - If in active set is preferrable
/// Position 5 - Higher own stake is preferrable
/// Position 6 - Higher number of Reasonable or KnownGood judgements is preferrable
/// Position 7 - Lower number of sub-accounts is preferrable

class ControlPanel extends Component {
	
 	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<WeightSlider title="Inclusion" type="inclusion" defaultValue={6} />
				<WeightSlider title="Commision" type="commission" defaultValue={2} />
				<WeightSlider title="Reward Points" type="points" defaultValue={10} />
			</div>
		)
	}
}

ControlPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ControlPanel));
  
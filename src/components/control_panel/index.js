import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QuantitySlider from '../quantity_slider';
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
				<QuantitySlider />
				<Box className={classes.weigths}>
					{/* <Typography variant="h5" color="textPrimary">
						Weights
					</Typography> */}
					<Typography variant="h6" gutterBottom>
					..based on the preferences below ⬇
					</Typography>
					<WeightSlider index={0} title="Inclusion" subTitle="Higher inclusion rate results on higher score" />
					<WeightSlider index={1} title="Commission" subTitle="Lower commission results on higher score" />
					<WeightSlider index={2} title="Reward Points" subTitle="Higher reward points results on higher score"/>
					<WeightSlider index={3} title="Staked Reward" subTitle="Staked reward results on higher score" />
					<WeightSlider index={4} title="Currently Active" subTitle="Currently active results on higher score" />
					<WeightSlider index={5} title="Own Stake" subTitle="Higher self stake results on higher score" />
					<WeightSlider index={6} title="Identity Judgement" subTitle="More Reasonable or KnownGood judgements results on higher score" />
					<WeightSlider index={7} title="Sub-accounts or Sibling-accounts" subTitle="Lower number of sub-accounts results on higher score" />
				</Box>
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
  
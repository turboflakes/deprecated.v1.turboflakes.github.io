import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QuantitySlider from '../quantity_slider';
import WeightSlider from '../weight_slider';
import PopoverWeight from '../popover_weight';
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
					..based on the <PopoverWeight /> assigned to each rate below ⬇
					</Typography>
					<WeightSlider index={0} 
						title="Inclusion" 
						description="The inclusion rate is calculated by the number of times a Validators was in the active set in the last 84 eras." 
						scaleDescription="The inclusion rate it's a normalized value in a 100-point scale. In the final equation a higher normalized value results on a higher score." />
					<WeightSlider index={1} 
						title="Commission" 
						description="The commission rate is the Commission fee the Validator charge for their service."
						scaleDescription="The commission rate it's a normalized value in a 100-point scale. In the final equation a lower normalized value results on a higher score." />
					<WeightSlider index={2} 
						title="Reward Points" 
						description="For every era, validators are paid proportionally to the amount of era points they have collected. Era points are reward points earned for payable actions while the Validator is in the active set. The reward points rate is calculated with the average of reward points a Validators collected in the last 84 eras."
						scaleDescription="The reward points rate it's a normalized value in a 100-point scale. In the normalization the maximum value is the the maximum of Era points collected from a Validator in a specific Era between the active Era and the last 84 Eras. And the minimum value is the minimum of Era points collected from a Validator in a specific Era between the active era and the last 84 Eras. In the final equation a higher normalized value results on a higher score."/>
					<WeightSlider index={3} 
						title="Reward destination 'Staked'"
						description="The reward destination 'Staked' is the stash account where the rewards from validating are sent increasing the amount at stake."
						scaleDescription="The reward destination 'Staked' rate it's a normalized value in a 100-point scale (0 = If Not 'Staked'; 100 = If 'Staked';). In the final equation a higher normalized value results on a higher score." />
					<WeightSlider index={4} 
						title="Currently Elected" 
						description="Validators that are currently in the active set."
						scaleDescription="The currently elected rate it's a normalized value in a 100-point scale (0 = If Not Active; 100 = If Active;). In the final equation a higher normalized value results on a higher score." />
					<WeightSlider index={5} 
						title="Own Self-stake" 
						description="The Own Self-stake are the amount of funds a Validator has bonded to their stash account. These funds are put at stake for the security of the network and can be slashed." 
						scaleDescription="The own self-stake rate it's a normalized value in a 100-point scale. In the normalization the maximum value is the maximum self-stake bonded from all Validators currently available. And the minimum value is the minimum self-stake currently bonded from all Validators currently available. In the final equation a higher normalized value results on a higher score." />
					<WeightSlider index={6} 
						title="Identity" 
						description="Identity is a naming system that allows participants to add personal information to their on-chain account and subsequently ask for verification of this information by registrars. When a registrar provides judgement, it can be one of the following [Unknown, Reasonable, Known Good, Out of Date, Low Quality, Erroneous]. The identity rate is based on the amount of acceptables judgements a Validator has with value equals to 'Reasonable' or 'Known Good'." 
						scaleDescription="The identity rate it's a normalized value in a 100-point scale. In the normalization the maximum value is the maximum number of judgements from all Validators currently available. And the minimum value is the minimum number of judgements from all Validators currently available. In the final equation a higher normalized value results on a higher score." />
					<WeightSlider index={7} 
						title="Sub-accounts" 
						description="Validators can link accounts by creating sub-accounts, each with its own identity, under a primary account. The sub-accounts rate is directly based on the total number of the Validator sub-accounts. Or in case of a child Validator, the sub-accounts rate is based on the parent total sub-accounts." 
						scaleDescription="The sub-accounts rate it's a normalized value in a 100-point scale. In the normalization the maximum value is the maximum number of sub-accounts from all Validators currently available. And the minimum value is the minimum number of sub-accounts from all Validators currently available. To better promote independent Validators in the final equation a lower normalized value results on a higher score." />
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
  
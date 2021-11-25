import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual'
import moment from 'moment';
import { selectors } from '../../../../selectors'
import {serializeBoard} from '../../../../utils/serialize'
import { stakeDisplayNoSymbol } from '../../../../utils/display'
import { 
	parseIntervalsIntoArray,
	parseRateIntervalToPercentage, 
	parseIntervalToRate, 
	parseCommissionIntervalToPercentage, 
	parseIntervalToCommission, 
} from '../../../../utils/math'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QuantitySlider from '../quantity_slider';
import WeightSlider from '../weight_slider';
import IntervalSlider from '../interval_slider';
import PopoverWeight from '../popover_weight';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

/// Position 0 - Higher Inclusion rate is preferable
/// Position 1 - Lower Commission is preferable
/// Position 2 - Lower Nominators is preferable (limit to 256 -> oversubscribed)
/// Position 3 - Higher Reward Points is preferable
/// Position 4 - If reward is staked is preferable
/// Position 5 - If in active set is preferable
/// Position 6 - Higher own stake is preferable
/// Position 7 - Lower total stake is preferable
/// Position 8 - Higher number of Reasonable or KnownGood judgements is preferable
/// Position 9 - Lower number of sub-accounts is preferable

class ControlPanel extends Component {

	render() {
		const { classes, apiCacheInfo, limits, intervals, networkDetails } = this.props;

		let _limits = parseIntervalsIntoArray(limits)
		let _intervals = parseIntervalsIntoArray(intervals)
		
		return (
			<div className={classes.root}>
				<Typography variant="caption" color="textSecondary">
					Synced at {!!apiCacheInfo.syncing_finished_at ? moment.unix(apiCacheInfo.syncing_finished_at).format('lll') : '...'}
				</Typography>
				<QuantitySlider />
				<Box className={classes.weigths}>
					{/* <Typography variant="h5" color="textPrimary">
						Weights
					</Typography> */}
					<Typography variant="subtitle2" color="textSecondary" gutterBottom>
					..based on the <PopoverWeight /> assigned to the traits below:
					</Typography>
					<Box className={classes.slidersBox}>
						<Box className={classes.weightsSlidersBox}>
							<WeightSlider index={0}
								title="Inclusion rate"
								description="The inclusion rate is the percentage of eras out of the past 84 that the validator was in the active set." 
								resultDescription="A higher inclusion rate results on a higher score."
								unit="%"
								limits={isEqual(_limits[0], _intervals[0]) ? parseRateIntervalToPercentage(_limits[0]) : parseRateIntervalToPercentage(_intervals[0])}
								/>
							<WeightSlider index={1}
								title="Commission" 
								description="The commission fee is a fee charged by a Validator for their service."
								resultDescription="A lower commission results on a higher score."
								unit="%"
								limits={isEqual(_limits[1], _intervals[1]) ? parseCommissionIntervalToPercentage(_limits[1]) : parseCommissionIntervalToPercentage(_intervals[1])}
								/>
						</Box>
						<Box className={classes.intervalsSlidersBox}>
							<IntervalSlider index={0}
								title="Interval"
								unit="%"
								parseFunc={parseIntervalToRate}
								interval={intervals ? parseRateIntervalToPercentage(_intervals[0]) : [0, 0]}
								limits={limits ? parseRateIntervalToPercentage(_limits[0]) : [0, 0]} 
								/>
							<IntervalSlider index={1}
								title="Interval"
								unit="%"
								parseFunc={parseIntervalToCommission}
								interval={intervals ? parseCommissionIntervalToPercentage(_intervals[1]) : [0, 0]}
								limits={limits ? parseCommissionIntervalToPercentage(_limits[1]) : [0, 0]} 
								/>
						</Box>
						{/* <WeightSlider index={1}
							title="Commission" 
							description="The commission fee is a fee charged by a Validator for their service."
							resultDescription="A lower commission results on a higher score."
							unit="%"
							minInterval={intervals ? intervals.commission.min : undefined}
							maxInterval={intervals ? intervals.commission.max : undefined}
							minLimit={limits ? limits.commission.min : undefined}
							maxLimit={limits ? limits.commission.max : undefined} />
						<WeightSlider index={2}
							title="Nominators"
							description="The number of nominators backing a validator."
							scaleDescription="The number of nominator is rescaled using the method min-max normalization. The maximum value is currently 256 (a validator is oversubscribed if more than 256 nominators nominate the same validator). And the minimum value is 0."
							resultDescription="A lower number of nominators results on a higher score." 
							minInterval={intervals ? intervals.nominators.min : undefined}
							maxInterval={intervals ? intervals.nominators.max : undefined}
							minLimit={limits ? limits.nominators.min : undefined}
							maxLimit={limits ? limits.nominators.max : undefined} />
						<WeightSlider index={3}
							title="Average points"
							description="The average reward points is calculated by the mean of reward points a Validator has collected in the last 84 eras. For every era, validators are paid proportionally to the amount of era points they have collected. Era points are reward points earned for payable actions while the Validator is in the active set."
							scaleDescription="The average reward points is rescaled using the method min-max normalization. The maximum value is the maximum of era points collected from a Validator in one of the last 84 eras. And the minimum value is the minimum of era points collected from a Validator in one of the last 84 eras."
							resultDescription="A higher average value results on a higher score." 
							minInterval={intervals ? intervals.avg_reward_points.min : undefined}
							maxInterval={intervals ? intervals.avg_reward_points.max : undefined}
							minLimit={limits ? limits.avg_reward_points.min : undefined}
							maxLimit={limits ? limits.avg_reward_points.max : undefined} />
						<WeightSlider index={4}
							title="Stake rewards"
							description="The reward destination as 'Staked' is the stash account where the rewards from validating are sent, increasing the amount at stake."
							scaleDescription="The expression stake rewards has a value of 0 if NOT 'Staked' or 1 if 'Staked'."
							resultDescription="A reward destination as 'Staked' results on a higher score." 
							hideIntervalSlider={true} />
						<WeightSlider index={5}
							title="Active" 
							description="The Validators that are active are in the active set."
							scaleDescription="The expression active has a value of 0 if NOT Active or 1 if Active."
							resultDescription="An active validator results on a higher score." 
							hideIntervalSlider={true} />
						<WeightSlider index={6}
							title="Own self-stake" 
							description="The own self-stake is the amount of funds a Validator has bonded to their stash account. These funds are put at stake for the security of the network and can be slashed." 
							scaleDescription="The own self-stake amount is rescaled using the method min-max normalization. The maximum value is the maximum self-stake bonded from all Validators currently available. And the minimum value is the minimum self-stake bonded from all Validators currently available."
							resultDescription="A higher own self-stake amount results on a higher score." 
							unit={networkDetails.token_symbol}
							minInterval={intervals ? intervals.own_stake.min : undefined}
							maxInterval={intervals ? intervals.own_stake.max : undefined}
							// minLimit={limits ? stakeDisplayNoSymbol(limits.own_stake.min, networkDetails) : 0}
							// maxLimit={limits ? stakeDisplayNoSymbol(limits.own_stake.max, networkDetails) : 1} />
							minLimit={limits ? limits.own_stake.min : undefined}
							maxLimit={limits ? limits.own_stake.max : undefined} />
						<WeightSlider index={7}
							title="Total stake" 
							description="The total stake is the sum of the validator own self-stake and the total amount bonded from the nominators who nominate the validator." 
							scaleDescription="The total stake amount is rescaled using the method min-max normalization. The maximum value is the maximum total stake from all Validators currently available. And the minimum value is the minimum total stake from all Validators currently available."
							resultDescription="A lower total stake amount results on a higher score." 
							unit={networkDetails.token_symbol}
							minInterval={intervals ? intervals.total_stake.min : undefined}
							maxInterval={intervals ? intervals.total_stake.max : undefined}
							minLimit={limits ? limits.total_stake.min : undefined}
							maxLimit={limits ? limits.total_stake.max : undefined} />
						<WeightSlider index={8}
							title="Identity" 
							description="Identity is a naming system that allows participants to add personal information to their on-chain account and subsequently ask for verification of this information by registrars. When a registrar provides judgement, it can be one of the following [Unknown, Reasonable, Known Good, Out of Date, Low Quality, Erroneous]. The identity rate is based in the amount of judgements a Validator has with acceptable values e.g. 'Reasonable' or 'Known Good'." 
							scaleDescription="The number of acceptable judgements is rescaled using the method min-max normalization. The maximum value is the maximum number of acceptable judgements from all Validators currently available. And the minimum value is the minimum number of acceptable judgements from all Validators currently available." 
							resultDescription="A higher number of acceptable judgements results on a higher score." 
							minInterval={intervals ? intervals.judgements.min : undefined}
							maxInterval={intervals ? intervals.judgements.max : undefined}
							minLimit={limits ? limits.judgements.min : undefined}
							maxLimit={limits ? limits.judgements.max : undefined} />
						<WeightSlider index={9}
							title="Sub-accounts" 
							description="Validators can link accounts by creating sub-accounts, each with its own identity, under a primary account. The number of sub-accounts is the total number of the Validator sub-accounts. Or in case of a child Validator, the number of sub-accounts is the total number of sub-accounts from the parent validator." 
							scaleDescription="The number of sub-accounts is rescaled using the method min-max normalization. The maximum value is the maximum number of sub-accounts from all Validators currently available. And the minimum value is the minimum number of sub-accounts from all Validators currently available."
							resultDescription="A lower number of sub-accounts results on a higher score." 
							minInterval={intervals ? intervals.sub_accounts.min : undefined}
							maxInterval={intervals ? intervals.sub_accounts.max : undefined}
							minLimit={limits ? limits.sub_accounts.min : undefined}
							maxLimit={limits ? limits.sub_accounts.max : undefined} /> */}
					</Box>
				</Box>
			</div>
		)
	}
}

ControlPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const networkDetails = selectors.getApiNetworkDetails(state)
	return {
		networkDetails,
		apiCacheInfo: selectors.getApiCacheDetails(state),
		limits: state.leaderboard.limits,
		intervals: state.leaderboard.intervals,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ControlPanel));
  
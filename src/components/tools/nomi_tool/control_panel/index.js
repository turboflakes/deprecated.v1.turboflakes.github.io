import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual'
import { get } from '../../../../actions/validator'
import { addAddresses } from '../../../../actions/leaderboard'
import { error, info, success } from '../../../../actions/notification'
import { setMaxNominations } from '../../../../actions/web3'
import { selectors } from '../../../../selectors'
import {hashDisplay} from '../../../../utils/display'
import { 
	parseIntervalsIntoArray,
	parseRateIntervalToPercentage, 
	parseIntervalToRate, 
	parseCommissionIntervalToPercentage, 
	parseIntervalToCommission, 
	parsePointsInterval,
	parseTokenInPlanckIntervalToUnit,
	parseTokenIntervalInUnitToPlanck
} from '../../../../utils/math'
import {
	getNetworkWSS, 
} from '../../../../constants'
import {
	web3Enable,
  web3FromSource,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NominateIcon from '@material-ui/icons/PanToolRounded';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import QuantitySlider from '../quantity_slider';
import WeightSlider from '../weight_slider';
import IntervalSlider from '../interval_slider';
import PopoverInfo from '../popover_info';
import Nominate from '../nominate'
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

	state = {
		isExtensionEnabled: false,
		nominate: false
	}

	componentDidMount() {
		// Polkadot{.js} extension
		// returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    web3Enable('turboflakes.io').then(extensions => {
      // console.log("__web3Enable", extensions);
      if (extensions.length === 0) {
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return;
      } 

			this.setState({isExtensionEnabled: true})
      
			this.getMaxNominations().then(a => {
				this.props.setMaxNominations(a.toNumber())
			})
			
    });
	}

	componentDidUpdate(prevProps) {
		const {network} = this.props
		if (prevProps.network !== network) {
			// Change network update maxNominations constant
			if (this.state.isExtensionEnabled) {
				this.getMaxNominations().then(a => {
					this.props.setMaxNominations(a.toNumber())
				})
			}
		}

		const {featured} = this.props
		if (prevProps.featured.length !== featured.length) {
			// Add featured stashes to the list of candidates
			this.props.addAddresses(featured)
			// Fetch featured Validators details
			featured.forEach(stash => this.props.get(stash))
		}
	}

	getMaxNominations = async () => {
    const {network} = this.props
    const provider = new WsProvider(getNetworkWSS(network));
    const api = await ApiPromise.create({ provider });
    return api.consts.staking.maxNominations;  
  }

	handleOnClickNominate = () => {
		const {nominate} = this.state
		if (nominate) {
			this.handleNominate()
			return
		}
		this.setState({nominate: true})
	}

	handleNominate = () => {
    // https://polkadot.js.org/docs/api/cookbook/blocks
    const {network, account, nominations} = this.props
    // console.log("__account: ", account);
    const provider = new WsProvider(getNetworkWSS(network));
    ApiPromise.create({ provider }).then(api => {
      web3FromSource(account.meta.source).then(injector => {
        const ext = api.tx.staking.nominate(nominations)
        const {method: { method, section }} = ext
        const extDescription = `${section}.${method}`
        ext.signAndSend(account.address, { signer: injector.signer }, ({status, events = []}) => {
          console.log(`Transaction status ${status.type}`)
          
          if (status.isInBlock) {
            console.log(`Transaction in block (https://${network}.subscan.io/extrinsic/${ext.hash.toString()})`)
            
            events.forEach(({ event }) => {
              const url = {
                href: `https://${network}.subscan.io/extrinsic/${ext.hash.toString()}`,
                text: hashDisplay(status.hash.toString())
              }
              if (api.events.system.ExtrinsicSuccess.is(event)) {
                this.props.success(`${extDescription} Success`, url)
              } else if (api.events.system.ExtrinsicFailed.is(event)) {
                // extract the data for this event
                const [dispatchError] = event.data;
                let errorInfo;

                // decode the error
                if (dispatchError.isModule) {
                  // for module errors, we have the section indexed, lookup
                  // (For specific known errors, we can also do a check against the
                  // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                  const decoded = api.registry.findMetaError(dispatchError.asModule);

                  errorInfo = `${decoded.section}.${decoded.name}`;
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  errorInfo = dispatchError.toString();
                }
                this.props.error(`${extDescription} Failed: ${errorInfo}`, url)
              }
            })
          } 
        })
        .catch(error => {
          return this.props.error(`${error}`)
        });
      })
    })
  }

	handleSelectTop = () => {
		const {addresses, maxNominations} = this.props
		this.props.addAddresses(addresses.slice(0, maxNominations))
	}

	render() {
		const { classes, apiCacheInfo, limits, intervals, networkDetails, 
			quantity, totalCandidates, account, nominations, maxNominations } = this.props;

		let _limits = parseIntervalsIntoArray(limits)
		let _intervals = parseIntervalsIntoArray(intervals)

		return (
			<Box className={classes.root} align="left">
					
				<Box className={classes.quantityBoxWrapper} >
					<Box className={classes.quantityBox} align="left">
						<Typography variant="subtitle2" color="textSecondary" gutterBottom>
						Display Top {quantity} {!!apiCacheInfo.validators ? `out of ${apiCacheInfo.validators} ` : `...`}Validators
						</Typography>
						<QuantitySlider />
					</Box>
					<Box className={classes.nominateBox}>
						<Button variant="contained" 
							color="primary"
							onClick={this.handleOnClickNominate}
							startIcon={<span className={classes.counter}>{`${totalCandidates}`}</span>}
							endIcon={this.state.nominate ? <NominateIcon /> : <VisibilityIcon />}
							disabled={this.state.nominate && (!nominations.length || !account.address)}
							>
							Nominate            
						</Button>
					</Box>
				</Box>

				{ this.state.nominate ? 
					<Nominate 
						isEnabled={this.state.isExtensionEnabled} 
						maxNominations={maxNominations}
						onSelectTop={this.handleSelectTop}
						onClose={() => this.setState({nominate: false})} /> : null}

				<Box className={classes.slidersBox} style={{
					height: this.state.nominate ? 308 : 678,
				}}>
					<Box className={classes.weightsSlidersBox}>
						<Box className={classNames(classes.titleBox, classes.weightsTitleBox)} display="flex" alignItems="center">
							<PopoverInfo linkComponent={
								<Typography variant="subtitle2" color="textSecondary">
									Weights
								</Typography>
								}>
								<Typography variant="body2" color="inherit" paragraph>
								Weights are your personal preferences and define the level of importance towards a specific trait.
								</Typography>
								<Typography variant="body2" color="inherit" >
									The weight scale is defined in a 9-point ordinal scale. e.g:
								</Typography>
								<Typography variant="body2" color="inherit" className={classes.popoverList}>
								0 = Not Applicable
								</Typography>
								<Typography variant="body2" color="inherit" className={classes.popoverList}>
								1 = Less Important
								</Typography>
								<Typography variant="body2" color="inherit" className={classes.popoverList}>
								5 = Moderately Important
								</Typography>
								<Typography variant="body2" color="inherit" className={classes.popoverList} gutterBottom>
								9 = Very Important
								</Typography>
								<Typography variant="body2" color="inherit" gutterBottom>
									Note: If you do not want a specific trait to interfer in the final score, you have the option to select <b className={classes.bold}>0 - Not Applicable</b>. 
								</Typography>
							</PopoverInfo>
						</Box>
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
						<WeightSlider index={2}
							title="Nominators"
							description="The number of nominators backing a validator."
							scaleDescription="The number of nominator is rescaled using the method min-max normalization. The maximum value is currently 256 (a validator is oversubscribed if more than 256 nominators nominate the same validator). And the minimum value is 0."
							resultDescription="A lower number of nominators results on a higher score." 
							limits={isEqual(_limits[2], _intervals[2]) ? _limits[2] : _intervals[2]}
							/>
						<WeightSlider index={3}
							title="Average points"
							description="The average reward points is calculated by the mean of reward points a Validator has collected in the last 84 eras. For every era, validators are paid proportionally to the amount of era points they have collected. Era points are reward points earned for payable actions while the Validator is in the active set."
							scaleDescription="The average reward points is rescaled using the method min-max normalization. The maximum value is the maximum of era points collected from a Validator in one of the last 84 eras. And the minimum value is the minimum of era points collected from a Validator in one of the last 84 eras."
							resultDescription="A higher average value results on a higher score." 
							limits={isEqual(_limits[3], _intervals[3]) ? parsePointsInterval(_limits[3]) : parsePointsInterval(_intervals[3])}
							/>
						<WeightSlider index={4}
							title="Stake rewards"
							description="The reward destination as 'Staked' is the stash account where the rewards from validating are sent, increasing the amount at stake."
							scaleDescription="The expression stake rewards has a value of 0 if NOT 'Staked' or 1 if 'Staked'."
							resultDescription="A reward destination as 'Staked' results on a higher score." 
							limits={isEqual(_limits[4], _intervals[4]) ? _limits[4] : _intervals[4]}
							/>
						<WeightSlider index={5}
							title="Active" 
							description="The Validators that are active are in the active set."
							scaleDescription="The expression active has a value of 0 if NOT Active or 1 if Active."
							resultDescription="An active validator results on a higher score." 
							limits={isEqual(_limits[5], _intervals[5]) ? _limits[5] : _intervals[5]}
							/>
						<WeightSlider index={6}
							title="Own self-stake" 
							description="The own self-stake is the amount of funds a Validator has bonded to their stash account. These funds are put at stake for the security of the network and can be slashed." 
							scaleDescription="The own self-stake amount is rescaled using the method min-max normalization. The maximum value is the maximum self-stake bonded from all Validators currently available. And the minimum value is the minimum self-stake bonded from all Validators currently available."
							resultDescription="A higher own self-stake amount results on a higher score." 
							unit={networkDetails.token_symbol}
							limits={isEqual(_limits[6], _intervals[6]) ? parseTokenInPlanckIntervalToUnit(_limits[6], networkDetails) : parseTokenInPlanckIntervalToUnit(_intervals[6], networkDetails)}
							/>
						<WeightSlider index={7}
							title="Total stake" 
							description="The total stake is the sum of the validator own self-stake and the total amount bonded from the nominators who nominate the validator." 
							scaleDescription="The total stake amount is rescaled using the method min-max normalization. The maximum value is the maximum total stake from all Validators currently available. And the minimum value is the minimum total stake from all Validators currently available."
							resultDescription="A lower total stake amount results on a higher score." 
							unit={networkDetails.token_symbol}
							limits={isEqual(_limits[7], _intervals[7]) ? parseTokenInPlanckIntervalToUnit(_limits[7], networkDetails) : parseTokenInPlanckIntervalToUnit(_intervals[7], networkDetails)}
							/>
						<WeightSlider index={8}
							title="Identity" 
							description="Identity is a naming system that allows participants to add personal information to their on-chain account and subsequently ask for verification of this information by registrars. When a registrar provides judgement, it can be one of the following [Unknown, Reasonable, Known Good, Out of Date, Low Quality, Erroneous]. The identity rate is based in the amount of judgements a Validator has with acceptable values e.g. 'Reasonable' or 'Known Good'." 
							scaleDescription="The number of acceptable judgements is rescaled using the method min-max normalization. The maximum value is the maximum number of acceptable judgements from all Validators currently available. And the minimum value is the minimum number of acceptable judgements from all Validators currently available." 
							resultDescription="A higher number of acceptable judgements results on a higher score." 
							limits={isEqual(_limits[8], _intervals[8]) ? _limits[8] : _intervals[8]}
							/>
						<WeightSlider index={9}
							title="Sub-accounts" 
							description="Validators can link accounts by creating sub-accounts, each with its own identity, under a primary account. The number of sub-accounts is the total number of the Validator sub-accounts. Or in case of a child Validator, the number of sub-accounts is the total number of sub-accounts from the parent validator." 
							scaleDescription="The number of sub-accounts is rescaled using the method min-max normalization. The maximum value is the maximum number of sub-accounts from all Validators currently available. And the minimum value is the minimum number of sub-accounts from all Validators currently available."
							resultDescription="A lower number of sub-accounts results on a higher score." 
							limits={isEqual(_limits[9], _intervals[9]) ? _limits[9] : _intervals[9]}
							/>
					</Box>
					<Box className={classes.intervalsSlidersBox}>
						<Box className={classNames(classes.titleBox, classes.slidersTitleBox)} display="flex" alignItems="center">
							<PopoverInfo linkComponent={
								<Typography variant="subtitle2" color="textSecondary">
									Filters
								</Typography>
								}>
								<Typography variant="body2" color="inherit" paragraph>
								Filters lets you limit the number of Validators to be included in the rank calculation.
								</Typography>
								<Typography variant="body2" color="inherit" >
								For example, you might want to be interested only in Validators with commission between 5% and 10%, so you can filter this specific trait so that a new rank is calculated for you.
								</Typography>
							</PopoverInfo>
						</Box>
						<IntervalSlider index={0}
							title="Interval"
							unit="%"
							stepFraction={20}
							parseFunc={parseIntervalToRate}
							interval={intervals ? parseRateIntervalToPercentage(_intervals[0]) : [0, 0]}
							limits={limits ? parseRateIntervalToPercentage(_limits[0]) : [0, 0]} 
							/>
						<IntervalSlider index={1}
							title="Interval"
							unit="%"
							stepFraction={20}
							parseFunc={parseIntervalToCommission}
							interval={intervals ? parseCommissionIntervalToPercentage(_intervals[1]) : [0, 0]}
							limits={limits ? parseCommissionIntervalToPercentage(_limits[1]) : [0, 0]} 
							/>
						<IntervalSlider index={2}
							title="Interval"
							stepFraction={20}
							interval={intervals ? _intervals[2] : [0, 0]}
							limits={limits ? _limits[2] : [0, 0]} 
							maxLimitLabel="+"
							/>
						<IntervalSlider index={3}
							title="Interval"
							stepFraction={20}
							interval={intervals ? parsePointsInterval(_intervals[3]) : [0, 0]}
							limits={limits ? parsePointsInterval(_limits[3]) : [0, 0]} 
							/>
						<Box className={classes.noSlider}></Box>
						<Box className={classes.noSlider}></Box>
						<IntervalSlider index={6}
							title="Interval"
							unit={networkDetails.token_symbol}
							stepFraction={20}
							parseFunc={(value) => parseTokenIntervalInUnitToPlanck(value, networkDetails)}
							interval={intervals ? parseTokenInPlanckIntervalToUnit(_intervals[6], networkDetails) : [0, 0]}
							limits={limits ? parseTokenInPlanckIntervalToUnit(_limits[6], networkDetails) : [0, 0]} 
							/>
						<IntervalSlider index={7}
							title="Interval"
							unit={networkDetails.token_symbol}
							stepFraction={20}
							parseFunc={(value) => parseTokenIntervalInUnitToPlanck(value, networkDetails)}
							interval={intervals ? parseTokenInPlanckIntervalToUnit(_intervals[7], networkDetails) : [0, 0]}
							limits={limits ? parseTokenInPlanckIntervalToUnit(_limits[7], networkDetails) : [0, 0]} 
							/>
						<IntervalSlider index={8}
							title="Interval"
							interval={intervals ? _intervals[8] : [0, 0]}
							limits={limits ? _limits[8] : [0, 0]}
							/>
						<IntervalSlider index={9}
							title="Interval"
							stepFraction={20}
							interval={intervals ? _intervals[9] : [0, 0]}
							limits={limits ? _limits[9] : [0, 0]}
							/>
					</Box>
				</Box>
			</Box>
		)
	}
}

ControlPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const networkDetails = selectors.getApiNetworkDetails(state)
	const addresses = selectors.getBoardAddresses(state)
	const featured = selectors.getApiFeatured(state)
	return {
		addresses,
		networkDetails,
		apiCacheInfo: selectors.getApiCacheDetails(state),
		network: selectors.getApiNetwork(state),
		account: state.web3.selectedAccount,
		nominations: state.leaderboard.nominations,
		featured,
		maxNominations: state.web3.maxNominations - featured.length > 0 ? state.web3.maxNominations - featured.length : 0,
		totalCandidates: state.leaderboard.nominations.length,
		quantity: state.leaderboard.quantity,
		limits: state.leaderboard.limits,
		intervals: state.leaderboard.intervals,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {get, setMaxNominations, addAddresses, error, info, success})(withStyles(styles)(ControlPanel));
  
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { query } from '../../../../actions/validator'
import { selectAddress } from '../../../../actions/leaderboard'
import { add } from '../../../../actions/error'
import {
	getNetworkIcon, 
	getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../../../constants'
import { selectors } from '../../../../selectors'
import serialize from '../../../../utils/serialize'
import { isValidAddress } from '../../../../utils/crypto'
import { web3Enable } from '@polkadot/extension-dapp';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import RightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ControlPanel from '../control_panel'
import AccountItem from '../account_item'
import Web3Extension from '../../../web3_extension'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Leaderboard extends Component {

	constructor(props) {
		super(props);

		let query = new URLSearchParams(props.location.search)
		let address = query.get("a")
		let state = {}
		if (isValidAddress(address)) {
			state = {
				address,
			}
		} else {
			query.delete("a")
		}

		this.state = {
			...state,
			openSettings: true,
			expandLeaderboard: false,
			settingsTabIndex: 1,
			isExtensionEnabled: false
		}
	}

	componentDidMount() {
		const {weights, quantity} = this.props
		if (!!weights && !!quantity) {
			this.props.query({q: "Board", w: weights, n: quantity})
		}
		if (this.state.address) {
			this.props.selectAddress(this.state.address)
		}

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
    });
	}

	componentDidUpdate(prevProps) {
		const {network, weights, quantity} = this.props
		if ((prevProps.network !== network) || (prevProps.weights !== weights) || (prevProps.quantity !== quantity)){
			if (weights === "0,0,0,0,0,0,0,0") {
				return this.props.add("Hey! Set at least one of the weights higher than 0, so that scores can be calculated.")
			}
			this.props.query({q: "Board", w: weights, n: quantity})
		}
	}

	handleNetworkSite = () => {
		const { network } = this.props;
		window.open(getNetworkURL(network), '_blank')
	}

	changeNetwork = (network) => {
		const {history, location} = this.props
		const query = new URLSearchParams(location.search)
		const newLocation = {
			pathname: `/${network}`,
			search: `?${query.toString()}`
		}
		history.replace(newLocation)
	}

	handleChangeTab = (event, index) => {
		event.preventDefault()
		this.changeNetwork(getNetworkKey(2-index))
	}

	handleChangeControlTab = (event, index) => {
		event.preventDefault()
		this.setState({settingsTabIndex: index})
	}

	render() {
		const { classes, network, networkDetails, addresses, selectedAccount } = this.props;

		return (
			<div className={classes.root} >
				{/* <Tabs value={2-getNetworkIndex(network)} onChange={this.handleChangeTab} >
					<Tab label="Westend" />
					<Tab label="Kusama" />
					<Tab label="Polkadot" />
				</Tabs> */}
				<Box className={classes.networkBox}>
					<IconButton color="primary" size="small" onClick={this.handleNetworkSite}>
						<img src={getNetworkIcon(network)} className={classes.networkLogo} alt={"Icon"}/>
					</IconButton>
					<Typography variant="subtitle1" color="textSecondary" className={classes.networkLabel} >
						{networkDetails.name}
					</Typography>
				</Box>
				<Box className={classes.titleBox}>
					<Typography variant="h4" color="textSecondary">
						LEADERBOARD
					</Typography>
					<Typography variant="subtitle2" color="textSecondary" gutterBottom>
						The highest-ranked Validators
					</Typography>
					<IconButton aria-label="Open / Close leaderboard settings" align="right"
						className={classes.iconSettings} onClick={() => this.setState({openSettings: !this.state.openSettings})}>
						{!this.state.openSettings ? <RightIcon /> : <DownIcon />}
					</IconButton>
				</Box>
				<Fade
					in={this.state.openSettings}
					style={{
						transitionDelay: !this.state.openSettings ? '800ms' : '0ms',
					}}
					unmountOnExit
				>
					<Box className={classes.settingsWrapperBox}>
						<Tabs value={this.state.settingsTabIndex} onChange={this.handleChangeControlTab} >
							<Tab label={this.state.isExtensionEnabled ? (!!selectedAccount ? selectedAccount : "Select Account") : "Connect Wallet" } />
							<Tab label="Settings" />
						</Tabs>
						<Box className={classes.settingsBox}>
							<Box className={classes.leaderboardBox} style={{
										left: !this.state.expandLeaderboard ? -56 : -240
									}}>
								<Box>
									<Box className={classes.iconExpandBox}>
										<IconButton aria-label="expand/collapse validator name"
											className={classes.iconExpand} 
											onClick={() => this.setState({expandLeaderboard: !this.state.expandLeaderboard})}>
											{!this.state.expandLeaderboard ? <LeftIcon /> : <DownIcon /> }
										</IconButton>
										{this.state.expandLeaderboard ? 
											<Typography variant="caption" color="textSecondary">
												Highest rank on top
											</Typography> : null}
									</Box>
									<Box className={classes.listBox} style={{
											minWidth: !this.state.expandLeaderboard ? 55 : 240
										}}>
										<List className={classes.list}>
											{addresses.map((address, index) => <AccountItem address={address} 
												key={index} expanded={this.state.expandLeaderboard}/>)}
										</List>
									</Box>
								</Box>
							</Box>
							{this.state.settingsTabIndex === 0 ? 
								<Web3Extension isEnabled={this.state.isExtensionEnabled} /> : <ControlPanel />}
						</Box>
					</Box>
				</Fade>
			</div>
		)
	}
}

Leaderboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const network = selectors.getApiNetwork(state)
	const networkDetails = selectors.getApiNetworkDetails(state)
  const weights = state.leaderboard.weights
	const quantity = state.leaderboard.quantity
	const query = serialize({q: "Board", w: weights, n: quantity})
	const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
	return {
		network,
		networkDetails,
		addresses,
		weights,
		quantity,
		selectedAccount: state.web3.name,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, add, selectAddress })(withRouter(withStyles(styles)(Leaderboard)));
  
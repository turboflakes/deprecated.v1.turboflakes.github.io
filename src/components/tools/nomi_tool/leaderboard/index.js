import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { query } from '../../../../actions/validator'
import { selectAddress, addAddresses } from '../../../../actions/leaderboard'
import { setMaxNominations } from '../../../../actions/web3'
import { error, info } from '../../../../actions/notification'
import {
	getNetworks,
	getNetworkWSS,
	getNetworkIcon, 
	// getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../../../constants'
import { selectors } from '../../../../selectors'
import serialize from '../../../../utils/serialize'
import { isValidAddress } from '../../../../utils/crypto'
import { web3Enable } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import RightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import ControlPanel from '../control_panel'
import AccountItem from '../account_item'
import Nominate from '../nominate'
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
			isExtensionEnabled: false,
			anchorEl: null
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
      
			this.getMaxNominations().then(a => {
				this.props.setMaxNominations(a.toNumber())
			})
			
    });
	}

	getMaxNominations = async () => {
    const {network} = this.props
    const provider = new WsProvider(getNetworkWSS(network));
    const api = await ApiPromise.create({ provider });
    return api.consts.staking.maxNominations;  
  }

	componentDidUpdate(prevProps) {
		const {network, weights, quantity} = this.props
		if ((prevProps.network !== network) || (prevProps.weights !== weights) || (prevProps.quantity !== quantity)){
			if (weights === "0,0,0,0,0,0,0,0,0,0") {
				return this.props.error("Hey! Set at least one of the weights higher than 0, so that scores can be calculated.")
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

	handleChangeNetwork = (network) => {
		this.changeNetwork(network)
		this.handleCloseNetworkMenu()
	}

	handleSelectTop = () => {
		const {addresses, maxNominations} = this.props
		this.props.addAddresses(addresses.slice(0, maxNominations))
	}

	handleClickNetworkMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseNetworkMenu = () => {
    this.setState({ anchorEl: null });
  };

	render() {
		const { classes, network, networkDetails, addresses, accountName, totalCandidates, maxNominations, isFetching } = this.props;
		const { anchorEl } = this.state
		const open = Boolean(anchorEl);

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
					<IconButton
						className={classes.iconNetwork}
						onClick={this.handleClickNetworkMenu}
					>
						<ArrowDropDownIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={this.handleCloseNetworkMenu}
					>
						{getNetworks().map(option => (
							<MenuItem key={option} selected={option === network} 
								onClick={() => this.handleChangeNetwork(option)}>
								{option}
							</MenuItem>
						))}
					</Menu>
					<Fade in={isFetching} 
							style={{
									transitionDelay: !isFetching ? '10ms' : '0ms',
								}}
								unmountOnExit
							>
							<CircularProgress size={24} className={classes.iconFetching} />
					</Fade>
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
							<Tab label={this.state.isExtensionEnabled ? (!!accountName ? accountName : "Select Account") : "Connect Wallet" } 
								icon={!!totalCandidates ? <span className={classes.counter}>{`${totalCandidates}`}</span> : null}
								classes={{
									wrapper: classes.tabWrapper,
									labelIcon: classes.tabLabelIcon,
								}}
								className={classes.tab} />
							<Tab label="Settings" className={classes.tab} />
						</Tabs>
						<Box className={classes.settingsBox}>
							<Box className={classes.leaderboardBox} style={{
										left: !this.state.expandLeaderboard ? -58 : -242
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
											{addresses.map((address, index) => 
												<AccountItem address={address} key={index} 
													expanded={this.state.expandLeaderboard}/>)}
										</List>
									</Box>
								</Box>
							</Box>
							{this.state.settingsTabIndex === 0 ? 
								<Nominate 
									isEnabled={this.state.isExtensionEnabled} 
									maxNominations={maxNominations}
									onSelectTop={this.handleSelectTop} /> : 
								<ControlPanel />}
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
		accountName: !!state.web3.selectedAccount ? (!!state.web3.selectedAccount.meta ? state.web3.selectedAccount.meta.name : undefined) : undefined,
		maxNominations: state.web3.maxNominations,
		totalCandidates: state.leaderboard.nominations.length,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, error, info, selectAddress, addAddresses, setMaxNominations })(withRouter(withStyles(styles)(Leaderboard)));
  
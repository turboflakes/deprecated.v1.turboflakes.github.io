import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { query, get } from '../../../../actions/validator'
import { selectAddress, addAddresses } from '../../../../actions/leaderboard'
import { setMaxNominations } from '../../../../actions/web3'
import { error, info } from '../../../../actions/notification'
import { scrollIntoView, enableScroll, disableScroll } from '../../../../actions/layout'
import {
	getNetworks,
	getNetworkWSS,
	getNetworkIcon, 
	// getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../../../constants'
import { selectors } from '../../../../selectors'
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
import { ReactComponent as PushPinIcon } from '../../../../assets/push_pin_white_24dp.svg';
import ControlPanel from '../control_panel'
import AccountItem from '../account_item'
import Nominate from '../nominate'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Leaderboard extends Component {

	rootRef = React.createRef();

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
		const {weights, intervals, quantity} = this.props
		if (!!weights && !!quantity && !!intervals) {
			this.props.query({q: "Board", w: weights, i: intervals, n: quantity})
		} else if (!!weights && !!quantity) {
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

	componentDidUpdate(prevProps) {
		// Layout
		const {view} = this.props
    if (view === "leaderboard" && prevProps.view !== view) {
			this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }

		const {network, weights, intervals, quantity} = this.props
		if ((prevProps.network !== network) || (prevProps.weights !== weights) || (prevProps.intervals !== intervals) || (prevProps.quantity !== quantity)){
			if (weights === "0,0,0,0,0,0,0,0,0,0") {
				return this.props.error("Please set at least one of the weights higher than 0, so that scores can be calculated.")
			}
			if (!!weights && !!quantity && !!intervals) {
				this.props.query({q: "Board", w: weights, i: intervals, n: quantity})
			} else if (!!weights && !!quantity) {
				this.props.query({q: "Board", w: weights, n: quantity})
			}
		}
		
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

	handleTogglePin = () => {
		const {scrollable} = this.props
		if (scrollable) {
			this.props.scrollIntoView("leaderboard")
			return this.props.disableScroll()
		}
		this.props.enableScroll()
	}

	render() {
		const { classes, network, networkDetails, addresses, accountName, totalCandidates, 
			maxNominations, isFetching, scrollable } = this.props;
		const { anchorEl } = this.state
		const open = Boolean(anchorEl);

		return (
			<Box className={classes.root} ref={this.rootRef} align="right">
				{/* <Tabs value={2-getNetworkIndex(network)} onChange={this.handleChangeTab} >
					<Tab label="Westend" />
					<Tab label="Kusama" />
					<Tab label="Polkadot" />
				</Tabs> */}
				<Box className={classes.networkBox}>
					<Box className={classes.networkLogoBox}>
						<IconButton color="primary" size="small" onClick={this.handleNetworkSite}>
							<img src={getNetworkIcon(network)} className={classes.networkLogo} alt={"Icon"}/>
						</IconButton>
						<Fade in={isFetching} 
								style={{
										transitionDelay: !isFetching ? '10ms' : '0ms',
									}}
									unmountOnExit
								>
								<CircularProgress size={64} className={classes.spinner} />
						</Fade>
					</Box>
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
					<IconButton aria-label="Enable / Disable scroll"
						style={scrollable ? {
								transform: "rotate(45deg)",
								boxShadow: "2px 2px #000"
							} : null}
						className={classes.iconScroll} onClick={this.handleTogglePin}>
						<PushPinIcon />
					</IconButton>
				</Box>
				<Box className={classes.titleBox} align="left">
					<Typography variant="h4" color="textSecondary">
						LEADERBOARD
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						The highest-ranked Validators
					</Typography>
					{/* <Typography variant="caption" color="textSecondary" >
						Synced at {!!apiCacheInfo.syncing_finished_at ? moment.unix(apiCacheInfo.syncing_finished_at).format('lll') : '...'}
					</Typography> */}
					<IconButton aria-label="Open / Close leaderboard settings" align="right"
						className={classes.iconSettings} onClick={() => this.setState({openSettings: !this.state.openSettings})}>
						{!this.state.openSettings ? <RightIcon /> : <DownIcon />}
					</IconButton>
				</Box>
				
				{this.state.openSettings ?
					<Fade
						in={this.state.openSettings}
						style={{
							transitionDelay: !this.state.openSettings ? '800ms' : '0ms',
						}}
						unmountOnExit
					> 
						<Tabs value={this.state.settingsTabIndex} className={classes.tabs}
							onChange={this.handleChangeControlTab} >
							<Tab label={this.state.isExtensionEnabled ? (!!accountName ? accountName : "Nominate") : "Connect Wallet" } 
								icon={!!totalCandidates ? <span className={classes.counter}>{`${totalCandidates}`}</span> : null}
								classes={{
									wrapper: classes.tabWrapper,
									labelIcon: classes.tabLabelIcon,
								}}
								className={classes.tab} />
							<Tab label="Settings" className={classes.tab} />
						</Tabs>
					</Fade> : null}
				
				<Box className={classes.settingsBox}>
					<Box className={classes.leaderboardBox}>
						<Box align="left">
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
									minWidth: !this.state.expandLeaderboard ? 55 : 288
								}}>
								<List className={classes.list}>
									{addresses.map((address, index) => 
										<AccountItem address={address} key={index} 
											expanded={this.state.expandLeaderboard}/>)}
								</List>
							</Box>
						</Box>
					</Box>
					{/*  */}
					<Box>
						{this.state.openSettings && this.state.settingsTabIndex === 0 ? 
							<Nominate 
								isEnabled={this.state.isExtensionEnabled} 
								maxNominations={maxNominations}
								onSelectTop={this.handleSelectTop} /> : null}

						{this.state.openSettings && this.state.settingsTabIndex === 1 ?
							<ControlPanel /> : null}
					</Box>
				</Box>
					{/* <Box className={classes.settingsWrapperBox}>
						<Tabs value={this.state.settingsTabIndex} onChange={this.handleChangeControlTab} >
							<Tab label={this.state.isExtensionEnabled ? (!!accountName ? accountName : "Nominate") : "Connect Wallet" } 
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
								<ControlPanel />
								}
						</Box>
					</Box> */}
			</Box>
		)
	}
}

Leaderboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const view = state.layout.view
	const scrollable = state.layout.scrollable
	const network = selectors.getApiNetwork(state)
	const networkDetails = selectors.getApiNetworkDetails(state)
  const weights = state.leaderboard.weights
	const intervals = state.leaderboard.intervals
	const quantity = state.leaderboard.quantity
	const addresses = selectors.getIdsByEntityAndLastQuery(state, 'validator', 'addresses')
	const featured = selectors.getApiFeatured(state)
	return {
		view,
		scrollable,
		network,
		networkDetails,
		addresses,
		weights,
		intervals,
		quantity,
		accountName: !!state.web3.selectedAccount ? (!!state.web3.selectedAccount.meta ? state.web3.selectedAccount.meta.name : undefined) : undefined,
		maxNominations: state.web3.maxNominations - featured.length > 0 ? state.web3.maxNominations - featured.length : 0,
		totalCandidates: state.leaderboard.nominations.length,
		featured,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, get, error, info, selectAddress, 
	addAddresses, setMaxNominations, scrollIntoView, enableScroll, disableScroll })(withRouter(withStyles(styles)(Leaderboard)));
  
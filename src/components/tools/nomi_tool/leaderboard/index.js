import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { query, get } from '../../../../actions/validator'
import { selectAddress, addAddresses } from '../../../../actions/leaderboard'
import { setMaxNominations } from '../../../../actions/web3'
import { error, info } from '../../../../actions/notification'
import { scrollIntoView, enableScroll, disableScroll } from '../../../../actions/layout'
import {
	getNetworks,
	getNetworkIcon, 
	// getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../../../constants'
import { selectors } from '../../../../selectors'
import { isValidAddress } from '../../../../utils/crypto'
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import UpIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import RightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import { ReactComponent as PushPinIcon } from '../../../../assets/push_pin_white_24dp.svg';
import ControlPanel from '../control_panel'
import AccountItem from '../account_item'
import SearchSmall from '../search_small'
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
		const { classes, network, networkDetails, addresses,
			apiCacheInfo, isFetching, scrollable } = this.props;
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
					<Typography variant="subtitle1" color="textSecondary" align="left" className={classes.networkLabel} >
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
					<IconButton aria-label="Open / Close leaderboard settings" align="right"
						className={classes.iconSettings} onClick={() => this.setState({openSettings: !this.state.openSettings})}>
						{!this.state.openSettings ? <UpIcon /> : <DownIcon />}
					</IconButton>
				</Box>
				
				{this.state.openSettings ?
						<Box className={classes.panelBox}>
							<Box className={classes.leaderboardBox} >
								<Box align="right" >
									<Box className={classes.expandBox}>
										{this.state.expandLeaderboard ? 
											<Typography variant="subtitle2" color="textSecondary" className={classes.expandTitle}>
												Highest ranked on top 
											</Typography> : null}
										<IconButton aria-label="expand/collapse validator name"
											className={classes.iconExpand} 
											onClick={() => this.setState({expandLeaderboard: !this.state.expandLeaderboard})}>
											{!this.state.expandLeaderboard ? <LeftIcon /> : <RightIcon /> }
										</IconButton>
									</Box>
									{this.state.expandLeaderboard ? 
										<Box className={classes.searchBox}>
											<SearchSmall />
										</Box> : null}
									<Box className={classes.listBox} style={{
											minWidth: !this.state.expandLeaderboard ? 48 : 260,
											height: !this.state.expandLeaderboard ? 698 : 657
										}}>
										<List className={classes.list}>
											{addresses.map((address, index) => 
												<AccountItem address={address} key={index} 
													expanded={this.state.expandLeaderboard}/>)}
										</List>
									</Box>
									<Box className={classes.footerBox} align="left">
										<Typography 
											variant="caption"
											color="textSecondary">
											{this.state.expandLeaderboard ? `Synced at ${!!apiCacheInfo.syncing_finished_at ? moment.unix(apiCacheInfo.syncing_finished_at).format('lll') : '...'}` : ''}
										</Typography>
									</Box>
								</Box>
							</Box>
							
							<Box className={classes.configBox}>
								<ControlPanel />
							</Box>
						</Box>
					 : null}
					
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
	return {
		view,
		scrollable,
		network,
		networkDetails,
		addresses,
		weights,
		intervals,
		quantity,
		apiCacheInfo: selectors.getApiCacheDetails(state),
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, get, error, info, selectAddress, 
	addAddresses, setMaxNominations, scrollIntoView, enableScroll, disableScroll })(withRouter(withStyles(styles)(Leaderboard)));
  
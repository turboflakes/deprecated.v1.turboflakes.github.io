import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { query } from '../../../../actions/validator'
import { selectAddress } from '../../../../actions/leaderboard'
import { add } from '../../../../actions/error'
import {getNetworkIcon, getNetworkIndex, getNetworkKey} from '../../../../constants'
import { selectors } from '../../../../selectors'
import serialize from '../../../../utils/serialize'
import { isValidAddress } from '../../../../utils/crypto'
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import UpIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import RightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ControlPanel from '../control_panel'
import AccountItem from '../account_item'
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
			open: true,
			expand: false,
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

	handleKusama = () => {
		window.open('https://kusama.network/', '_blank')
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
		console.log("handleChangeTab", index);
		event.preventDefault()
		this.changeNetwork(getNetworkKey(2-index))
	}

	render() {
		const { classes, network, networkDetails, addresses } = this.props;

		return (
			<div className={classes.root} >
				<Tabs value={2-getNetworkIndex(network)} onChange={this.handleChangeTab} >
					<Tab label="Westend" />
					<Tab label="Kusama" />
					<Tab label="Polkadot" />
				</Tabs>
				<Box className={classes.networkBox}>
					<IconButton color="primary" size="small" onClick={this.handleKusama}>
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
						className={classes.iconSettings} onClick={() => this.setState({open: !this.state.open})}>
						{!this.state.open ? <DownIcon /> : <UpIcon />}
					</IconButton>
				</Box>
				<Fade
					in={this.state.open}
					style={{
						transitionDelay: !this.state.open ? '800ms' : '0ms',
					}}
					unmountOnExit
				>
					<Box className={classes.settingsBox}>
						<Box className={classes.leaderboardBox} style={{
									left: !this.state.expand ? -56 : -240
								}}>
							<Box>
								<Box className={classes.iconExpandBox}>
									<IconButton aria-label="expand/collapse validator name"
										className={classes.iconExpand} 
										onClick={() => this.setState({expand: !this.state.expand})}>
										{!this.state.expand ? <RightIcon /> : <LeftIcon />}
									</IconButton>
								</Box>
								<Box className={classes.listBox} style={{
										minWidth: !this.state.expand ? 55 : 240
									}}>
									<List className={classes.list}>
										{addresses.map((address, index) => <AccountItem address={address} 
											key={index} expanded={this.state.expand}/>)}
									</List>
								</Box>
							</Box>
						</Box>
						<ControlPanel />
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
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, add, selectAddress })(withRouter(withStyles(styles)(Leaderboard)));
  
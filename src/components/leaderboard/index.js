import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import {NETWORK} from '../../constants'
import { query } from '../../actions/validator'
import { selectAddress } from '../../actions/leaderboard'
import { add } from '../../actions/error'
import { selectors } from '../../selectors'
import serialize from '../../utils/serialize'
import { isValidAddress } from '../../utils/crypto'
import Box from '@material-ui/core/Box';
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
// import AccountSearchDialog from '../account_search_dialog'
import { ReactComponent as KusamaSVG } from '../../assets/kusama_icon.svg';
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
		const {weights, quantity} = this.props
		if ((prevProps.weights !== weights) || (prevProps.quantity !== quantity)){
			if (weights === "0,0,0,0,0,0,0,0") {
				return this.props.add("Hey! Set at least one of the weights higher than 0, so that scores can be calculated.")
			}
			this.props.query({q: "Board", w: weights, n: quantity})
		}
	}

	handleKusama = () => {
		window.open('https://kusama.network/', '_blank')
	}

	render() {
		const { classes, addresses } = this.props;

		return (
			<div className={classes.root} >
				<Box className={classes.networkBox}>
					<IconButton color="primary" size="small" onClick={this.handleKusama}>
						<KusamaSVG className={classes.networkLogo} />
					</IconButton>
					<Typography variant="subtitle1" color="textSecondary" className={classes.networkLabel} >
						Kusama
					</Typography>
					{/* <IconButton color="primary" aria-label="search for a validator" className={classes.searchIcon}
						onClick={() => this.setState({open: true})}>
						<SearchIcon />
					</IconButton> */}
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
									left: !this.state.expand ? -121 : -276
								}}>
							<Box className={classes.iconExpandBox}>
								<IconButton aria-label="expand/collapse validator name"
									className={classes.iconExpand} 
									onClick={() => this.setState({expand: !this.state.expand})}>
									{!this.state.expand ? <RightIcon /> : <LeftIcon />}
								</IconButton>
							</Box>
							<Box className={classes.listBox} style={{
									minWidth: !this.state.expand ? 55 : 211
								}}>
								<List className={classes.list}>
									{addresses.map((address, index) => <AccountItem address={address} key={index} expanded={this.state.expand}/>)}
								</List>
							</Box>
						</Box>
						<ControlPanel />
					</Box>
				</Fade>
				{/* <AccountSearchDialog open={this.state.open} 
					onClose={() => this.setState({open: false})}>
        </AccountSearchDialog> */}
			</div>
		)
	}
}

Leaderboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const weights = state.leaderboard.weights
	const quantity = state.leaderboard.quantity
	const query = serialize({q: "Board", w: weights, n: quantity})
	const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
	return {
		addresses,
		weights,
		quantity,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, add, selectAddress })(withRouter(withStyles(styles)(Leaderboard)));
  
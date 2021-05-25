import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { query } from '../../actions/validator'
import { selectAddress } from '../../actions/leaderboard'
import { add } from '../../actions/error'
import { selectors } from '../../selectors'
import serialize from '../../utils/serialize'
import { isValidAddress } from '../../utils/crypto'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountItem from '../account_item'
import AccountSearchDialog from '../account_search_dialog'
import { ReactComponent as KusamaSVG } from '../../assets/kusama_icon.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Leaderboard extends Component {

	constructor(props) {
		super(props);

		let query = new URLSearchParams(props.location.search)
		let address = query.get("a")
		if (isValidAddress(address)) {
			this.state = {
				address,
				open: false
			}
		} else {
			query.delete("a")
			this.state = {
				open: false
			}
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
		const { classes, addresses, info } = this.props;

		return (
			<div className={classes.root}>
				<Box className={classes.network}>
					<IconButton color="primary" size="small" onClick={this.handleKusama}>
						<KusamaSVG className={classes.networkLogo} />
					</IconButton>
					<Typography variant="h5" color="textPrimary" className={classes.networkLabel} >
						Kusama
					</Typography>
					<IconButton color="primary" aria-label="search for a validator" className={classes.searchIcon}
						onClick={() => this.setState({open: true})}>
						<SearchIcon />
					</IconButton>
				</Box>
				<Box className={classes.title}>
					<Typography variant="h4" color="textPrimary" >
						LEADERBOARD
					</Typography>
					<Box className={classes.subTitle}>
						<Typography variant="caption" gutterBottom>
							The highest-ranked Validators
						</Typography>
						{!!info.cache ? 
							<Typography variant="caption" align="right">
							Last sync: {moment.unix(info.cache.syncing_finished_at).format('lll')}
							</Typography> : null}
					</Box>						
				</Box>
				<List component="nav" className={classes.list}>
					{addresses.map((address, index) => <AccountItem address={address} key={index} />)}
				</List>
				<AccountSearchDialog open={this.state.open} 
					onClose={() => this.setState({open: false})}>
        </AccountSearchDialog>
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
	const info = selectors.getObjectByEntityAndId(state, 'api', '_')
	return {
		addresses,
		weights,
		quantity,
		info,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query, add, selectAddress })(withRouter(withStyles(styles)(Leaderboard)));
  
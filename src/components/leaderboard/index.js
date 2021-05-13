import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { query } from '../../actions/validator'
import { selectors } from '../../selectors'
import serialize from '../../utils/serialize'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountItem from '../account_item'
import AccountSearchDialog from '../account_search_dialog'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Leaderboard extends Component {

	state = {
		open: false
	}

	componentDidMount() {
		const {weights, quantity} = this.props
		if (!!weights && !!quantity) {
			this.props.query({q: "Board", w: weights, n: quantity})
		}
	}

	componentDidUpdate(prevProps) {
		const {weights, quantity} = this.props
		if ((prevProps.weights !== weights) || (prevProps.quantity !== quantity)){
			this.props.query({q: "Board", w: weights, n: quantity})
		}
	}

	render() {
		const { classes, addresses } = this.props;

		return (
			<div className={classes.root}>
				<Box className={classes.header}>
					<Box>
						<Typography variant="h4" color="textPrimary">
							Leaderboard
						</Typography>
						<Typography variant="caption" gutterBottom>
							The highest-ranked Validators
						</Typography>
					</Box>
					<Box>
					<IconButton color="primary" aria-label="search for a validator" onClick={() => this.setState({open: true})}>
						<SearchIcon />
					</IconButton>
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
	return {
		addresses,
		weights,
		quantity,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query })(withStyles(styles)(Leaderboard));
  
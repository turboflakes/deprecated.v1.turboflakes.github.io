import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { query } from '../../actions/validator'
import { selectors } from '../../selectors'
import serialize from '../../utils/serialize'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AccountItem from '../account_item'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Leaderboard extends Component {
	
	componentDidMount(){
		const {weights, quantity} = this.props
    this.props.query({q: "Board", w: weights, n: quantity})
  }

	componentDidUpdate(prevProps) {
		const {weights, quantity} = this.props
		if ((prevProps.weights !== weights) || (prevProps.quantity !== quantity)){
			this.props.query({q: "Board", w: weights, n: quantity})
		}
	}

 	render() {
		const { classes, ids } = this.props;

		return (
			<div className={classes.root}>
				<Grid container className={classes.container}>
					<Grid item xs={1}></Grid>
					<Grid item xs={10} sm={12}>
						<List component="nav" className={classes.list}>
              {ids.map((id, index) => <AccountItem id={id} key={index} />)}
            </List>
					</Grid>
					<Grid item xs={1}></Grid>
				</Grid>
			</div>
		)
	}
}

Leaderboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const weights = Object.values(state.leaderboard.weights).toString()
	const quantity = state.leaderboard.quantity
	const query = serialize({q: "Board", w: weights, n: quantity})
	const ids = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'data')
	return {
		ids,
		weights,
		quantity,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query })(withStyles(styles)(Leaderboard));
  
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { query } from '../../actions/validator'
import { selectors } from '../../selectors'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AccountItem from '../account_item'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Container extends Component {
	
	state = {
    selectedIndex: -1,
  }

	componentDidMount(){
    this.props.query({q: "All", n: "16"})
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

Container.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const ids = selectors.getIdsByEntityAndLastQuery(state, 'validator', 'data')
  return {
		ids,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { query })(withStyles(styles)(Container));
  
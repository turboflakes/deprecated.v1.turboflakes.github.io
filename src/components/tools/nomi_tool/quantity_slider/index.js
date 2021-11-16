import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { selectors } from '../../../../selectors'
import { changeQuantity } from '../../../../actions/leaderboard'
import { parseInt } from '../../../../utils/math'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const marks = [
  {
    value: 8,
    label: '',
  },
  {
    value: 16,
    label: '',
  },
  {
    value: 24,
    label: '',
  },
  {
    value: 32,
    label: '',
  },
	{
    value: 64,
    label: '',
  },
	{
    value: 128,
    label: '',
  }
];

const MAX_QUANTITY = 128;

class QuantitySlider extends Component {

	constructor(props) {
		super(props);

		let query = new URLSearchParams(props.location.search)
		let quantity = parseInt(query.get("n"))
		quantity = quantity > 0 && quantity <= MAX_QUANTITY ? quantity : 24
		this.changeParams(query, quantity)
		this.state = { value: quantity }
	}

	changeParams = (query, value) => {
		const {history} = this.props
		query.set("n", value)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

	componentDidMount() {
		const {value} = this.props
		if (this.state.value !== value) {
			this.props.changeQuantity(this.state.value)
		}
	}
	
	handleOnChangeCommitted = (_event, value) => {
		const {location} = this.props
		let query = new URLSearchParams(location.search)
		this.changeParams(query, value)
		this.props.changeQuantity(value)
	}

 	render() {
		const { classes, value, apiCacheInfo } = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="subtitle2" color="textSecondary" id="discrete-slider" gutterBottom>
				Display the Top {value} {!!apiCacheInfo.validators ? `out of ${apiCacheInfo.validators} ` : `...`}Validators..
				</Typography>
				<Slider
					className={classes.slider}
					defaultValue={this.state.value}
					getAriaValueText={() => value}
					color="primary"
					valueLabelDisplay="on"
					step={null}
					min={8}
					max={128}
					marks={marks}
					onChangeCommitted={this.handleOnChangeCommitted}
				/>
			</div>
		)
	}
}

QuantitySlider.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		apiCacheInfo: selectors.getApiCacheDetails(state),
		value: state.leaderboard.quantity,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeQuantity })(withRouter(withStyles(styles)(QuantitySlider)));
  
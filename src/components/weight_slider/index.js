import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changeWeight } from '../../actions/leaderboard'
import { parseArray } from '../../utils/math'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class WeightSlider extends Component {

	constructor(props) {
		super(props);

		const query = new URLSearchParams(props.location.search)
		let weightValues = parseArray(query.get("w"))
		this.changeParams(query, weightValues)
		this.state = { value: weightValues[props.index] }
	}

	changeParams = (query, weightValues) => {
		const {history} = this.props
		query.set("w", weightValues)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

	componentDidMount() {
		const {index, value} = this.props
		if (this.state.value !== value) {
			this.props.changeWeight(index, this.state.value)
		}
	}
	
	handleOnChangeCommitted = (_event, value) => {
		const {index, location} = this.props
		const query = new URLSearchParams(location.search)
		let weightValues = parseArray(query.get("w"))
		weightValues[index] = value
		this.changeParams(query, weightValues)
		this.props.changeWeight(index, value)
	}

 	render() {
		const { classes, title, subTitle, value, minValue, maxValue} = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="subtitle1" id="discrete-slider">
				{title}
				</Typography>
				<Typography variant="caption" id="discrete-slider-sub" gutterBottom>
        {subTitle}
				</Typography>
				<Slider
					defaultValue={this.state.value}
					getAriaValueText={() => value}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					step={1}
					marks
					min={!!minValue ? minValue : 0}
					max={!!maxValue ? maxValue : 10}
					onChangeCommitted={this.handleOnChangeCommitted}
				/>
			</div>
		)
	}
}

WeightSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: parseArray(state.leaderboard.weights)[ownProps.index],
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeWeight })(withStyles(styles)(withRouter(WeightSlider)));
  
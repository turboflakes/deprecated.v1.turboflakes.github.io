import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual'
import { changeWeight, changeInterval } from '../../../../actions/leaderboard'
import { parseIntervalsIntoArray } from '../../../../utils/math'
import { selectors } from '../../../../selectors'
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const valueLabelFormat = (v, i) => {
	return `${v}`	
	// if (i === 1) {
	// 	return `${v}]`	
	// }
	// return `[${v}`
}

class IntervalSlider extends Component {

	sliderRef = React.createRef();

	constructor(props) {
		super(props);
		let query = new URLSearchParams(props.location.search)
		if (query.get("i")) {
			let intervals = parseIntervalsIntoArray(query.get("i"))
			this.state = { 
				interval: intervals[props.index]
			}	
			return 
		}
		this.state = { 
			interval: props.interval
		}
	}



	changeParamsIntervals = (query, intervals) => {
		const {history} = this.props
		query.set("i", intervals.join())
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

	componentDidMount() {
		const {index, interval, parseFunc} = this.props
		if (this.state.interval !== interval) {
			const parsedValue = parseFunc ? parseFunc(this.state.interval) : this.state.interval
			this.props.changeInterval(index, parsedValue)
		}
	}

	componentDidUpdate	(prevProps) {
		const {interval} = this.props
		if (!isEqual(prevProps.interval, interval)) {
			this.setState({interval})
		}
	}

	handleOnChange = (event, value) => {
		event.preventDefault()
		if (value[0] >= value[1] || value[1] < value[0]) {
			return
		}
		this.setState({interval: value})
	}

	handleOnChangeCommitted = (event, value) => {
		event.preventDefault()
		const {index, intervals, location, parseFunc} = this.props
		let query = new URLSearchParams(location.search)
		let _intervals = parseIntervalsIntoArray(intervals)
		_intervals[index] = value.join().replace(',', ':');
		this.changeParamsIntervals(query, _intervals)
		const parsedValue = parseFunc ? parseFunc(value) : value
		this.props.changeInterval(index, parsedValue)
		this.setState({interval: value})
	}

 	render() {
		const { classes, unit, limits, minLimitLabel, maxLimitLabel, stepFraction} = this.props;

		const marks = [
			{
				value: limits[0],
				label: `${minLimitLabel || ''}${Math.round(limits[0])} ${unit || ''}`,
			},
			{
				value: limits[1],
				label: `${maxLimitLabel || ''}${Math.round(limits[1])} ${unit || ''}`,
			},
		];

		const step = !!stepFraction ? parseInt(((limits[1] - limits[0]) / stepFraction), 10) : 1

		return (
			<div className={classes.root}>
				<Box className={classes.traitBox}>
						<Box className={classes.titleBox}>
							{/* <Typography variant="subtitle2" color="textSecondary" align="left"
								className={classes.title}>
								{title}
							</Typography> */}
						</Box>
				</Box>
					<Slider
						ref={this.sliderRef}
						className={classes.slider}
						classes={{
							valueLabel: classes.sliderValueLabel
						}}
						// disabled={isFetching}
						color="primary"
						value={this.state.interval}
						getAriaValueText={valueLabelFormat}
						// ValueLabelComponent={ValueLabelComponent}
						valueLabelFormat={valueLabelFormat}
						valueLabelDisplay="on"
						step={step}
						min={!!limits ? parseInt(limits[0], 10) : 0}
						max={!!limits ? parseInt(limits[1], 10) : 0}
						marks={marks}
						onChange={this.handleOnChange}
						onChangeCommitted={this.handleOnChangeCommitted}
					/>
			</div>
		)
	}
}

IntervalSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	scaleDescription: PropTypes.string,
	resultDescription: PropTypes.string,
	interval: PropTypes.array,
	limits: PropTypes.array,
	parseFunc: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
	const networkDetails = selectors.getApiNetworkDetails(state)
	return {
		networkDetails,
		intervals: state.leaderboard.intervals,
		isFetching: !!state.fetchers.async
  }
}

export default connect(mapStateToProps, { changeWeight, changeInterval })(withRouter(withStyles(styles)(IntervalSlider)));
  
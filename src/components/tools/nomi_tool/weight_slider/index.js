import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import serialize from '../../../../utils/serialize'
import { changeWeight, changeInterval } from '../../../../actions/leaderboard'
import { parseArray, parseArrayIntervals } from '../../../../utils/math'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import PopoverInfo from '../popover_info'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class WeightSlider extends Component {

	constructor(props) {
		super(props);

		let query = new URLSearchParams(props.location.search)
		let weights = parseArray(query.get("w"))
		this.changeParamsWeights(query, weights)
		let intervals = parseArrayIntervals(query.get("i"))
		this.changeParamsIntervals(query, intervals)
		this.state = { 
			value: weights[props.index],
			interval: intervals[props.index].split(":")
		 }
	}

	changeParamsWeights = (query, weights) => {
		const {history} = this.props
		query.set("w", weights.join())
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
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
		const {index, value} = this.props
		if (this.state.value !== value) {
			this.props.changeWeight(index, this.state.value)
		}
	}
	
	handleOnChangeCommittedWeight = (_event, value) => {
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let weights = parseArray(query.get("w"))
		weights[index] = value
		this.changeParamsWeights(query, weights)
		this.props.changeWeight(index, value)
	}

	handleOnChangeCommittedInterval = (event, value) => {
		event.preventDefault()
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let intervals = parseArrayIntervals(query.get("i"))
		intervals[index] = value.join().replace(',', ':');
		this.changeParamsIntervals(query, intervals)
		this.props.changeInterval(index, intervals[index])
		this.setState({interval: intervals[index].split(":")})
	}

 	render() {
		const { classes, title, description, scaleDescription, resultDescription, value, minValue, maxValue, 
			hideIntervalSlider, unitLimit, minLimit, maxLimit, isFetching} = this.props;

		const marks = [
			{
				value: minLimit,
				label: `${Math.round(minLimit)} ${unitLimit || ''}`,
			},
			{
				value: maxLimit,
				label: `${Math.round(maxLimit)} ${unitLimit || ''}`,
			},
		];
		return (
			<div className={classes.root}>
				<Box className={classes.traitBox}>
					<PopoverInfo isFetching={isFetching}>
						<Typography variant="subtitle2">
							{title} 
						</Typography>
						<Typography variant="body2" color="inherit" gutterBottom>
						{description}
						</Typography>
						<Typography variant="body2" color="inherit" gutterBottom>
						{scaleDescription}
						</Typography>
						<Typography variant="body2" color="inherit">
						{resultDescription}
						</Typography>
						{!hideIntervalSlider ? 
							<Box className={classes.sliderIntervalBox}>
								<Typography variant="subtitle2">
								{title} Interval
								</Typography>
								<Typography variant="body2" 
									className={classes.caption}>
								Only Validators with the {title} between the interval defined below are ranked in the leaderboard
								</Typography>
								<Slider
									className={classes.sliderInterval}
									classes={{
										root: classes.sliderIntervalRoot,
										track: classes.sliderIntervalTrack,
										rail: classes.sliderIntervalRail,
										thumb: classes.sliderIntervalThumb,
										valueLabel: classes.sliderIntervalValueLabel
									}}
									disabled={isFetching}
									color="primary"
									defaultValue={this.state.interval}
									valueLabelFormat={(v, i) => {
										if (i === 1) {
											return `${v}`	
										}
										return `${v}`
									}}
									valueLabelDisplay="on"
									step={1}
									min={!!minLimit ? Math.round(minLimit) : 0}
									max={!!maxLimit ? Math.round(maxLimit) : 100}
									marks={marks}
									onChange={(event) => event.preventDefault()}
									onChangeCommitted={this.handleOnChangeCommittedInterval}
								/>
							</Box> : null}
						</PopoverInfo>
						<Box className={classes.titleBox}>
							<Typography variant="subtitle2" color="textSecondary" align="left"
								className={classes.title}>
								{title}
							</Typography>
							{!hideIntervalSlider ?
								<Typography variant="caption" color="textSecondary"
									className={classes.caption}>
									{`[${this.state.interval.toString()}]`} {unitLimit ? `(${unitLimit})` : null} 
								</Typography> : null}
						</Box>
					</Box>
					<Slider
						className={classes.slider}
						color="secondary"
						defaultValue={this.state.value}
						getAriaValueText={() => value}
						valueLabelDisplay="on"
						step={1}
						min={!!minValue ? minValue : 0}
						max={!!maxValue ? maxValue : 9}
						onChangeCommitted={this.handleOnChangeCommittedWeight}
					/>
			</div>
		)
	}
}

WeightSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	scaleDescription: PropTypes.string,
	resultDescription: PropTypes.string,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
	const weights = state.leaderboard.weights
	const intervals = state.leaderboard.intervals
	const quantity = state.leaderboard.quantity
	const query = serialize({q: "Board", w: weights, i: intervals, n: quantity})
	return {
		value: parseArray(state.leaderboard.weights)[ownProps.index],
		isFetching: !!state.fetchers.queries[`validator?${query}`],
  }
}

export default connect(mapStateToProps, { changeWeight, changeInterval })(withRouter(withStyles(styles)(WeightSlider)));
  
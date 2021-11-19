import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changeWeight, changeRange } from '../../../../actions/leaderboard'
import { parseArray, parseArrayRanges } from '../../../../utils/math'
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
		this.state = { 
			value: weights[props.index],
			limitRange: [0, 100]
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

	changeParamsRanges = (query, ranges) => {
		const {history} = this.props
		query.set("r", ranges.join())
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
		console.log("__handleOnChangeCommittedWeight", value);
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let weights = parseArray(query.get("w"))
		weights[index] = value
		this.changeParamsWeights(query, weights)
		this.props.changeWeight(index, value)
	}

	handleOnChangeCommittedRange = (_event, value) => {
		console.log("__handleOnChangeCommittedRange", value);
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let ranges = parseArrayRanges(query.get("r"))
		ranges[index] = value.join().replace(',', ':')
		this.changeParamsRanges(query, ranges)
		this.props.changeRange(index, ranges[index])
	}

 	render() {
		const { classes, title, description, scaleDescription, resultDescription, value, minValue, maxValue, 
			rangeUnit, rangeMinValue, rangeMaxValue} = this.props;
		return (
			<div className={classes.root}>
					<Box className={classes.titleBox}>
						<PopoverInfo >
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
							<Box className={classes.sliderRangeBox}>
								<Typography variant="subtitle2">
								{title} range
								</Typography>
								<Typography variant="body2" 
									className={classes.caption}>
								Only Validators with their {title} result inside the range defeined below are ranked in the leaderboard
								</Typography>
								<Slider
									className={classes.slider}
									classes={{
										root: classes.sliderRangeRoot,
										track: classes.sliderRangeTrack,
										rail: classes.sliderRangeRail,
										thumb: classes.sliderRangeThumb,
										valueLabel: classes.sliderRangeValueLabel
									}}
									color="primary"
									defaultValue={this.state.limitRange}
									valueLabelFormat={(v, i) => {
										if (i === 1) {
											return `${v}${rangeUnit || ''} max`	
										}
										return `${v}${rangeUnit || ''} min`
									}}
									valueLabelDisplay="on"
									step={1}
									min={!!rangeMinValue ? rangeMinValue : 0}
									max={!!rangeMaxValue ? rangeMaxValue : 100}
									onChangeCommitted={this.handleOnChangeCommittedRange}
								/>
							</Box>
						</PopoverInfo>
						<Typography variant="subtitle2" color="textSecondary" align="left"
						 className={classes.title}>
						{title}
						</Typography>
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
	return {
		value: parseArray(state.leaderboard.weights)[ownProps.index],
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeWeight, changeRange })(withRouter(withStyles(styles)(WeightSlider)));
  
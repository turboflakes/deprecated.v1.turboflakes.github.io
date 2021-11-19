import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changeWeight, changeRange } from '../../actions/leaderboard'
import { parseArray, parseArrayRanges } from '../../utils/math'
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
		let weightValues = parseArray(query.get("w"))
		this.changeParams(query, weightValues)
		this.state = { 
			value: weightValues[props.index],
			limitRange: [0, 100]
		 }
	}

	changeParams = (query, weightValues) => {
		const {history} = this.props
		query.set("w", weightValues.join())
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
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let weightValues = parseArray(query.get("w"))
		weightValues[index] = value
		this.changeParams(query, weightValues)
		this.props.changeWeight(index, value)
	}

	handleOnChangeCommittedRange = (_event, value) => {
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let ranges = parseArrayRanges(query.get("r"))
		ranges[index] = value.join().replace(',', ':')
		this.changeParamsRanges(query, ranges)
		this.props.changeRange(index, ranges[index])
	}

 	render() {
		const { classes, title, description, scaleDescription, resultDescription, value, minValue, maxValue} = this.props;
		return (
			<div className={classes.root}>
				<Box className={classes.titleBox}>
					<Typography variant="h6" className={classes.title}>
					{title}
					</Typography>
					<PopoverInfo >
						{/* <Typography variant="h6">
						{title}
						</Typography> */}
						<Typography variant="body2" color="inherit" gutterBottom>
						{description}
						</Typography>
						<Typography variant="body2" color="inherit" gutterBottom>
						{scaleDescription}
						</Typography>
						<Typography variant="body2" color="inherit">
						{resultDescription}
						</Typography>
					</PopoverInfo>
				</Box>
				<Box className={classes.sliderBox}>
					<Typography variant="caption">
						Weight given to {title} 
					</Typography>
					<Slider
						className={classes.slider}
						defaultValue={this.state.value}
						getAriaValueText={() => value}
						valueLabelDisplay="on"
						step={1}
						min={!!minValue ? minValue : 0}
						max={!!maxValue ? maxValue : 10}
						onChangeCommitted={this.handleOnChangeCommittedWeight}
					/>
				</Box>
				<Box className={classes.sliderBox}>
					<Typography variant="caption" className={classes.caption}>
						{title} limit range
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
						color="secondary"
						defaultValue={this.state.limitRange}
						valueLabelFormat={(v, i) => {
							if (i === 1) {
								return `${v} max`	
							}
							return `${v} min`
						}}
						valueLabelDisplay="on"
						step={1}
						min={!!minValue ? minValue : 0}
						max={!!maxValue ? maxValue : 100}
						onChangeCommitted={this.handleOnChangeCommittedRange}
					/>
				</Box>
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
  
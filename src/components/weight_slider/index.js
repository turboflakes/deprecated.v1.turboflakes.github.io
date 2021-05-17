import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changeWeight } from '../../actions/leaderboard'
import { parseArray } from '../../utils/math'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import PopoverInfo from '../popover_info'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const marks = [
	{
		value: 0,
    label: '0',
	},
  {
		value: 1,
    label: '1',
	},
	{
		value: 2,
    label: '2',
	},
	{
		value: 3,
    label: '3',
	},
	{
		value: 4,
    label: '4',
	},
	{
		value: 5,
    label: '5',
	},
	{
		value: 6,
    label: '6',
	},
	{
		value: 7,
    label: '7',
	},
	{
		value: 8,
    label: '8',
	},
	{
		value: 9,
    label: '9',
	},
	{
		value: 10,
    label: '10',
	},
]

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
		const { classes, title, description, scaleDescription, value, minValue, maxValue} = this.props;
		return (
			<div className={classes.root}>
				<Box className={classes.titleBox}>
					<PopoverInfo >
						<Typography variant="h6">
						{title} rate
						</Typography>
						<Typography variant="body1" gutterBottom>
						{description}
						</Typography>
						<Typography variant="body1" gutterBottom>
						{scaleDescription}
						</Typography>
					</PopoverInfo>
					<Typography variant="subtitle1" className={classes.title}>
					{title} rate
					</Typography>
				</Box>
				<Typography id={title} variant="caption">
					{title} weight
				</Typography>
				<Slider
					aria-labelledby={title}
					className={classes.slider}
					defaultValue={this.state.value}
					getAriaValueText={() => value}
					valueLabelDisplay="off"
					classes={{
						markLabel: classes.markLabel,
						markLabelActive: classes.markLabelActive
					}}
					step={1}
					marks={marks}
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
	description: PropTypes.string,
	scaleDescription: PropTypes.string,
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
  
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changeWeight } from '../../../../actions/leaderboard'
import { parseWeightsIntoArray } from '../../../../utils/math'
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
		if (query.get("w")) {
			let weights = parseWeightsIntoArray(query.get("w"))
			this.state = { 
				value: weights[props.index],
			}
			return
		}
		this.state = { 
			value: props.value
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

	componentDidMount() {
		const {index, value} = this.props
		if (this.state.value !== value) {
			this.props.changeWeight(index, this.state.value)
		}
	}
	
	handleOnChangeCommittedWeight = (_event, value) => {
		const {index, location} = this.props
		let query = new URLSearchParams(location.search)
		let weights = parseWeightsIntoArray(query.get("w"))
		weights[index] = value
		this.changeParamsWeights(query, weights)
		this.props.changeWeight(index, value)
	}

	render() {
		const { classes, title, description, scaleDescription, resultDescription, 
			minValue, maxValue, unit, limits, isFetching} = this.props;
		
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
					</PopoverInfo>
					<Box className={classes.titleBox}>
						<Typography variant="body" color="textSecondary" align="left"
							className={classes.title}>
							{title}
						</Typography>

						{!!limits.length ?
							<Typography variant="caption" color="textSecondary"
								className={classes.caption}>
								{`[${limits[0]}, ${limits[1]}]`} {unit ? `(${unit})` : null} 
							</Typography> : null}

					</Box>
				</Box>
					<Slider
						className={classes.slider}
						color="secondary"
						// disabled={isFetching}
						defaultValue={this.state.value}
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
	limits: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: parseWeightsIntoArray(state.leaderboard.weights)[ownProps.index],
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeWeight })(withRouter(withStyles(styles)(WeightSlider)));
  
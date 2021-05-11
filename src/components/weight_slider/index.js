import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { changeWeight } from '../../actions/leaderboard'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class WeightSlider extends Component {

	componentDidMount() {
		const {type, defaultValue} = this.props
		if (defaultValue) {
			this.props.changeWeight(type, defaultValue)
		}
	}
	
	handleOnChangeCommitted = (_event, value) => {
		const {type} = this.props
		this.props.changeWeight(type, value)
	}

 	render() {
		const { classes, title, subTitle, value, defaultValue, minValue, maxValue} = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="subtitle1" id="discrete-slider">
				{title}
				</Typography>
				<Typography variant="caption" id="discrete-slider-sub" gutterBottom>
        {subTitle}
				</Typography>
				<Slider
					defaultValue={defaultValue}
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
	title: PropTypes.string,
	subTitle: PropTypes.string,
	type: PropTypes.oneOf(['inclusion', 'commission', 'reward_points', 'reward_staked', 'active', 'own_stake', 'judgements', 'sub_accounts']).isRequired,
	defaultValue: PropTypes.number,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: state.leaderboard.weights[ownProps.type],
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeWeight })(withStyles(styles)(WeightSlider));
  
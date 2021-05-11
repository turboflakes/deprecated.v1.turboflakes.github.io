import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { weight } from '../../actions/leaderboard'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class WeightSlider extends Component {

	componentDidMount() {
		const {type, defaultValue} = this.props
		if (defaultValue) {
			this.props.weight(type, defaultValue)
		}
	}
	
	handleOnChangeCommitted = (_event, value) => {
		const {type} = this.props
		this.props.weight(type, value)
	}

 	render() {
		const { classes, title, value, defaultValue } = this.props;
		return (
			<div className={classes.root}>
				<Typography id="discrete-slider" gutterBottom>
        {title}
				</Typography>
				<Slider
					defaultValue={defaultValue}
					getAriaValueText={() => value}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					step={1}
					marks
					min={0}
					max={10}
					onChangeCommitted={this.handleOnChangeCommitted}
				/>
			</div>
		)
	}
}

WeightSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	type: PropTypes.oneOf(['inclusion', 'commission', 'points']).isRequired,
	defaultValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: state.leaderboard.weights[ownProps.type],
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { weight })(withStyles(styles)(WeightSlider));
  
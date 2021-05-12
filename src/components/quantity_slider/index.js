import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { changeQuantity } from '../../actions/leaderboard'
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
    label: '16',
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
  },
	{
    value: 256,
    label: '256',
  },
	{
    value: 512,
    label: '512',
  },
	{
    value: 1024,
    label: '1024',
  },
];

class QuantitySlider extends Component {

	componentDidMount() {
		const {defaultValue} = this.props
		if (defaultValue) {
			this.props.changeQuantity(defaultValue)
		}
	}
	
	handleOnChangeCommitted = (_event, value) => {
		this.props.changeQuantity(value)
	}

 	render() {
		const { classes, value, defaultValue } = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="h6" id="discrete-slider" gutterBottom>
				Select the maximum amount of Validators to be displayed
				</Typography>
				<Slider
					defaultValue={defaultValue}
					getAriaValueText={() => value}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					color="secondary"
					classes={{
						markLabelActive: classes.markLabelActive,
						markLabel: classes.markLabel
					}}
					step={null}
					min={8}
					max={1024}
					marks={marks}
					onChangeCommitted={this.handleOnChangeCommitted}
				/>
			</div>
		)
	}
}

QuantitySlider.propTypes = {
	classes: PropTypes.object.isRequired,
	defaultValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: state.leaderboard.quantity,
		isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { changeQuantity })(withStyles(styles)(QuantitySlider));
  
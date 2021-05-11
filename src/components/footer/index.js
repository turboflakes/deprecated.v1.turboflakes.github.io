import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Footer extends Component {
	
 	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid container className={classes.container}>
					<Grid item xs={1}></Grid>
					<Grid item xs={10} sm={12}>
						Footer
					</Grid>
					<Grid item xs={1}></Grid>
				</Grid>
			</div>
		)
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
  
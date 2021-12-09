import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/EmailRounded';
import logo from '../../assets/logo/logo_1_inverted_subtract_turboflakes_.svg';
import { ReactComponent as TwitterSVG } from '../../assets/twitter.svg';
import { ReactComponent as GithubSVG } from '../../assets/github.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Footer extends Component {
	
	handleTwitter = () => {
		window.open('https://twitter.com/turboflakes', '_blank')
	}
	
	handleGithub = () => {
		window.open('https://github.com/turboflakes', '_blank')
	}

	handleEmail = () => {
		window.location.href = "mailto:support@turboflakes.com"
	}

 	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
					<Grid container className={classNames(classes.container, classes.padding)}>
						<Grid container item xs={6}>
							<Link href="/" color="inherit" align="right" >
								<img src={logo} className={classes.logo} alt={"logo"}/>
							</Link>
						</Grid>
          	<Grid item xs={3}>
							<Typography variant="h5" color="textSecondary" paragraph>
								General
							</Typography>
							<Typography color="textSecondary" gutterBottom>
								<Link href="/#/about"  color="inherit">About us</Link>
							</Typography>
							<Typography color="textSecondary" gutterBottom>
								<Link href="/#/tools"  color="inherit">Tools</Link>
							</Typography>
							<Typography color="textSecondary" gutterBottom>
								<Link href="/#/validators"  color="inherit">Validators</Link>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="h5" color="textSecondary" paragraph>
								Networks
							</Typography>
							<Typography color="textSecondary" gutterBottom>
								<Link href="https://polkadot.network/" target="_blank" rel="noreferrer" color="inherit">Polkadot Network</Link>
							</Typography>
							<Typography color="textSecondary" gutterBottom>
								<Link href="https://kusama.network/" target="_blank" rel="noreferrer" color="inherit">Kusama Network</Link>
							</Typography>
						</Grid>
					</Grid>
					
					<Divider className={classes.container} light classes={{ light: classes.light }}/>				
				
					<Box className={classNames(classes.container, classes.bottom)}>
						<Box>
							<Box className={classes.trademark}>
								<Typography variant="body2" color="textSecondary">
								© 2021 TurboFlakes
								</Typography>
								<Typography variant="body2" color="textSecondary" className={classes.page}>
									<Link href="/#/disclaimer"  color="inherit" >Disclaimer</Link>
								</Typography>
								<Typography variant="body2" color="textSecondary" className={classes.page}>
									<Link href="/#/privacy"  color="inherit" >Privacy Policy</Link>
								</Typography>
								<Typography variant="body2" color="textSecondary" className={classes.page}>
									<Link href="/#/terms"  color="inherit" >Terms of Use</Link>
								</Typography>
								<Typography variant="body2" color="textSecondary" className={classes.page}>
									<Link href="/#/cookies"  color="inherit" >Cookie Settings</Link>
								</Typography>
							</Box>
						</Box>
						<Box>
							<IconButton size="small" className={classes.iconEmail} onClick={this.handleEmail}>
								<EmailIcon />
							</IconButton>
							<IconButton color="primary" size="small" className={classes.icon} onClick={this.handleTwitter}>
								<TwitterSVG />
							</IconButton>
							<IconButton color="primary" size="small" className={classes.icon} onClick={this.handleGithub}>
								<GithubSVG />
							</IconButton>
						</Box>
					</Box>
			</div>
		)
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Footer));
  
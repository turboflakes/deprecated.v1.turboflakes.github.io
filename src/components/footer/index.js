import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import { selectors } from '../../selectors'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Identicon from '@polkadot/react-identicon';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/EmailRounded';
import { ReactComponent as TwitterSVG } from '../../assets/twitter.svg';
import { ReactComponent as GithubSVG } from '../../assets/github.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const kusama = "FZsMKYHoQG1dAVhXBMyC7aYFYpASoBrrMYsAn1gJJUAueZX"
const polkadot = "12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2"

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
		const { classes, info, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Box className={classes.container}>
					<Typography color="textSecondary">
					<b>TURBOFLAKES</b> is an independent validator in the Kusama Network.
					</Typography>
					<Typography color="textSecondary">
					If you like this project ✌️ Share our work and support us with your nomination ✨💙
					</Typography>
					<List component="nav" className={classes.list}>
						<ListItem key={kusama} >
							<ListItemAvatar>
								<Identicon
									value={kusama}
									size={32}
									theme={'polkadot'} />
							</ListItemAvatar>
							<ListItemText primary={kusama} secondary="Kusama Account" 
								classes={{
									primary: classes.primary,
									secondary: classes.secondary
								}}/>
						</ListItem>
						<ListItem key={polkadot} >
							<ListItemAvatar>
								<Identicon
									value={polkadot}
									size={32}
									theme={'polkadot'} />
							</ListItemAvatar>
							<ListItemText primary={polkadot} secondary="Polkadot Account" 
								classes={{
									primary: classes.primary,
									secondary: classes.secondary
								}} />
						</ListItem>
					</List>
					{/* <Typography color="textSecondary">
					Support your nominations using <b>TURBOFLAKES</b> decision tool ✌
					</Typography> */}
				</Box>
				<Divider light classes={{ light: classes.light }}/>
					<Box className={classes.about}>
						<Typography color="textSecondary">
							<Link href="https://kusama.network/" target="_blank" rel="noreferrer" color="inherit">About Kusama Network</Link>
						</Typography>
						<Typography color="textSecondary">
							<Link href="https://guide.kusama.network/docs/en/mirror-maintain-guides-how-to-nominate-kusama" target="_blank" rel="noreferrer" color="inherit">How to Nominate</Link>
						</Typography>
					</Box>
				<Divider light classes={{ light: classes.light }}/>
				<Box className={classes.bottom}>
					<Box>
						<Typography color="textSecondary">
						© 2021 Turboflakes
						</Typography>
						{!!info.cache ? 
							<Box>
								<Typography variant="caption" className={classes.info}>
								app v{process.env.REACT_APP_VERSION}
								</Typography>
								<Typography variant="caption" className={classes.info}>
								api v{info.version}
								</Typography>
								<Typography variant="caption" className={classes.info}>
								last sync time: {moment.unix(info.cache.syncing_finished_at).format('lll')} ({info.cache.syncing ? `syncing` : `duration ${moment.unix(info.cache.syncing_finished_at).diff(moment.unix(info.cache.syncing_started_at), 'minutes')} min`})
								</Typography>
							</Box> : null}
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

const mapStateToProps = (state, ownProps) => ({
	info: selectors.getObjectByEntityAndId(state, 'api', '_')
})

export default connect(mapStateToProps)(withStyles(styles)(Footer));
  
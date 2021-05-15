import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import { selectors } from '../../selectors'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Identicon from '@polkadot/react-identicon';
import IconButton from '@material-ui/core/IconButton';
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

 	render() {
		const { classes, info, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Container className={classes.container}>
					<Typography color="textSecondary">
					If you like this project - Share our work 🖖 Support us by Nominate, Tip or Donate ✨💙
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
				</Container>
				<Divider light classes={{ light: classes.light }}/>
				<Container className={classes.bottom}>
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
								cache	last synced at {moment.unix(info.cache.syncing_finished_at).format('lll')} ({info.cache.syncing ? `syncing` : `${moment.unix(info.cache.syncing_finished_at).diff(moment.unix(info.cache.syncing_started_at), 'minutes')}min`})
								</Typography>
							</Box> : null}
					</Box>
					<Box>
						<IconButton color="primary" size="small" className={classes.icon} onClick={this.handleTwitter}>
							<TwitterSVG />
						</IconButton>
						<IconButton color="primary" size="small" className={classes.icon} onClick={this.handleGithub}>
							<GithubSVG />
						</IconButton>
					</Box>
				</Container>
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
  
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { selectors } from '../../selectors'
import { addressSS58 } from '../../utils/crypto'
import { selectAddress } from '../../actions/leaderboard'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Identicon from '@polkadot/react-identicon';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/EmailRounded';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as TurboflakesSVG } from '../../assets/turboflakes_white.svg';
import { ReactComponent as TwitterSVG } from '../../assets/twitter.svg';
import { ReactComponent as GithubSVG } from '../../assets/github.svg';
import { ReactComponent as PolkadotSVG } from '../../assets/polkadot_logotype_white.svg';
import { ReactComponent as KusamaSVG } from '../../assets/kusama_logo.svg';
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

	changeParams = (query, value) => {
		const {history} = this.props
		query.set("a", value)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

	handleSearch = () => {
    const {location} = this.props
		let query = new URLSearchParams(location.search)
		this.changeParams(query, kusama)
		this.props.selectAddress(addressSS58(kusama))
  }

 	render() {
		const { classes, info, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Box className={classes.container}>
					<Typography color="textSecondary">
					TURBOFLAKES is also an independent validator in the Kusama Network.
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
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="search" onClick={this.handleSearch} 
									classes={{root: classes.iconRoot}}>
									<SearchIcon />
								</IconButton>
							</ListItemSecondaryAction>
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
					<Typography color="textSecondary" gutterBottom>
						Support your nominations with TURBOFLAKES decision tool ✌
					</Typography>
				</Box>
				<Divider light classes={{ light: classes.light }}/>
				<Box className={classes.container}>
					<Typography variant="body2" color="textSecondary">
						DISCLAIMER<br />It is very important to do your own research before nominating a validator since there is a risk of <Link href="https://wiki.polkadot.network/docs/en/learn-staking#slashing" target="_blank" rel="noreferrer" color="inherit"><u>slashing</u></Link>. TURBOFLAKES does not control, take responsibility for, or assume liability for any validator misbehaviour displayed on this Website. TURBOFLAKES only provides a decision support tool that can help you choose among a set of validators based on their traits and your personal preferences.
					</Typography>
				</Box>
				<Divider light classes={{ light: classes.light }}/>
					<Box className={classes.about}>
						<Box className={classes.aboutNetwork}>
							<Link href="https://polkadot.network/" target="_blank" rel="noreferrer" color="inherit">
								<PolkadotSVG className={classes.polkadotLogo} />
							</Link>
							<Typography color="textSecondary" className={classes.networkLink} >
								<Link href="https://polkadot.network/technology/" target="_blank" rel="noreferrer" color="inherit">About Polkadot Network</Link>
							</Typography>
							<Typography color="textSecondary" className={classes.networkLink} >
								<Link href="https://wiki.polkadot.network/docs/en/maintain-guides-how-to-nominate-polkadot" target="_blank" rel="noreferrer" color="inherit">How to Nominate on Polkadot</Link>
							</Typography>
						</Box>
						<Box className={classes.aboutNetwork}>
							<Link href="https://kusama.network/" target="_blank" rel="noreferrer" color="inherit">
								<KusamaSVG className={classes.kusamaLogo} />
							</Link>
							<Typography color="textSecondary" className={classes.networkLink}>
								<Link href="https://kusama.network/" target="_blank" rel="noreferrer" color="inherit">About Kusama Network</Link>
							</Typography>
							<Typography color="textSecondary" className={classes.networkLink}>
								<Link href="https://guide.kusama.network/docs/en/mirror-maintain-guides-how-to-nominate-kusama" target="_blank" rel="noreferrer" color="inherit">How to Nominate on Kusama</Link>
							</Typography>
						</Box>
					</Box>
				<Divider light classes={{ light: classes.light }}/>
				<Box className={classes.bottom}>
					<Box>
						<Box className={classes.trademark}>
							<TurboflakesSVG className={classes.logo} />
							<Typography color="textSecondary">
							© 2021 Turboflakes
							</Typography>
						</Box>
						{!!info.cache ? 
							<Box className={classes.infoBox}>
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

export default connect(mapStateToProps, {selectAddress})(withRouter(withStyles(styles)(Footer)));
  
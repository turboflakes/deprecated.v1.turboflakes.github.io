import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const kusama = "FZsMKYHoQG1dAVhXBMyC7aYFYpASoBrrMYsAn1gJJUAueZX"
const polkadot = "12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2"

class Footer extends Component {
	
 	render() {
		const { classes, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Container className={classes.container}>
					<Typography color="textSecondary">
					If you like this project - Support us 🖖 Nominate, Tip or Donate ✨💙
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
				<Container className={classes.container}>
					<Typography color="textSecondary">
					Turboflakes © 2021
					</Typography>
				</Container>
			</div>
		)
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
  
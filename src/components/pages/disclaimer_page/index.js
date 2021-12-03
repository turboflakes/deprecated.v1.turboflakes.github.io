import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import HeaderLogo from '../header_logo'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class DisclaimerPage extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    if (this.rootRef.current) {
      this.rootRef.current.scrollIntoView()
    }
  }
  
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root} ref={this.rootRef}>
        <HeaderLogo />
        <Container className={classes.container} >
          <Typography variant="h2" align="center" className={classes.title}>
            Disclaimer
          </Typography>
          <Typography paragraph>
          It is very important to do your own research before nominating a validator since there is a risk of <Link href="https://wiki.polkadot.network/docs/en/learn-staking#slashing" target="_blank" rel="noreferrer" color="textPrimary" underline="always">slashing</Link>.
          </Typography>
          <Typography paragraph>
          TurboFlakes does not control, take responsibility for, or assume 
          liability for any validator misbehaviour displayed on this Website.
          </Typography>
          <Typography paragraph>
          TurboFlakes only provides a decision support tool that can help you 
          choose among a set of validators based on their traits and your personal preferences.
          </Typography> 
        </Container>
      </div>
    )
  }
}

DisclaimerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisclaimerPage);

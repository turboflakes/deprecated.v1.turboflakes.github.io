import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AboutPage extends Component {

  render() {
    const { classes } = this.props;
    
    return (
      <Container className={classes.root}>
        <IconButton aria-label="Back" color="primary" href="/#/" className={classes.backIcon}>
          <ArrowBackIcon />
       </IconButton>
       <Typography variant="h5" color="inherit" align="center" className={classes.header} paragraph>
          Disclaimer
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       It is very important to do your own research before nominating a validator since there is a risk of <Link href="https://wiki.polkadot.network/docs/en/learn-staking#slashing" target="_blank" rel="noreferrer" color="inherit" underline="always">slashing</Link>.
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Turboflakes does not control, take responsibility for, or assume liability for any validator misbehaviour displayed on this Website. Turboflakes only provides a decision support tool that can help you choose among a set of validators based on their traits and your personal preferences.
       </Typography>
      </Container>
    )
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);

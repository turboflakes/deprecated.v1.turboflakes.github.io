import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// import logo from '../../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import logo from '../../../../assets/logo/logo_2_color_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class HeroSection extends Component {

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root}>
        <Box className={classes.logoBox} align="center">
          <img src={logo} className={classes.logo} alt={"logo"}/>
        </Box>
        <Box className={classes.motoBox} align="center">
          <Box className={classes.titleBox}>
            <Box className={classes.substrate}>
              <Typography variant="h5" color="textPrimary" className={classes.support}>
                <div>AND</div><div className={classes.the}>THE</div>
              </Typography>
              <Typography variant="h1" color="textPrimary" className={classes.title}>
                SUBSTRATE
              </Typography>
            </Box>
            <Typography variant="h1" color="textPrimary" align="center" 
              className={classes.title}>
              TOOLS GARAGE
            </Typography>
          </Box>
          <Box className={classes.subtitleBox} >
            <Typography
                variant="subtitle1"
                color="textPrimary"
                align="center"
                gutterBottom
              >
              Awesome <Link href="https://substrate.io/" 
              target="_blank" rel="noreferrer" color="inherit" 
              className={classes.link}>Substrate</Link> means bold tools. <b>TurboFlakes</b> provides end-user tooling to help you to interact with Substrate blockchain networks.
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  }
}

HeroSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeroSection);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stashDisplay } from '../../../../utils/display'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Identicon from '@polkadot/react-identicon';
import raidenLogo from '../../../../assets/raiden.svg';
import polkadotLogo from '../../../../assets/Polkadot_Logo_Horizontal_Pink-White.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const RAIDEN_STASH = "12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2"

class PolkadotValidatorSection extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    const {scrollHere} = this.props
    if (scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  componentDidUpdate(prevProps) {
    const {scrollHere} = this.props
    if (scrollHere && prevProps.scrollHere !== scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.mascotBox}>
              <Box className={classes.nameBox}>
                <Typography
                    variant="h1"
                    color="textPrimary"
                    align="left"
                  >RAIDEN
                </Typography>
                <Box className={classes.nameBase} />
              </Box>
              <Box className={classes.logoBox}>
                <img src={raidenLogo} className={classes.logo} alt={"Raiden Polkadot Validator"}/>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.descriptionGrid}> 
            <Box className={classes.descriptionBox}>
              <Typography
                  variant="h4"
                  color="textSecondary"
                  align="left"
                  paragraph
                >Stake with TurboFlakes
              </Typography>
              <Typography
                  variant="body1"
                  color="textSecondary"
                  align="left"
                  paragraph
                ><b>Raiden</b> is our supra-sumo Validator running in the Polkadot Network.
              </Typography>
              <Typography
                  variant="body1"
                  color="textSecondary"
                  align="left"
                ><b>Raiden's</b> commission is <b>0%</b> and you get instant rewards every era.
              </Typography>
              <Box className={classes.ident}>
                <Identicon
                  value={RAIDEN_STASH}
                  size={32}
                  theme={'polkadot'} />
                <Typography
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                  align="left"
                >{stashDisplay(RAIDEN_STASH)} <br/>TURBOFLAKES.IO/<b>RAIDEN</b>
                </Typography>
              </Box>                
              <Box className={classes.polkadotLogoBox}>
                <img src={polkadotLogo} className={classes.polkadotLogo} alt={"Polkadot Network"}/>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> 
    )
  }
}

PolkadotValidatorSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PolkadotValidatorSection);
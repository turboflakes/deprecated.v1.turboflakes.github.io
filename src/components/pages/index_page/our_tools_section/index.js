import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {scrollIntoView} from '../../../../actions/layout'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import crunchLogo from '../../../../assets/crunchbot.svg';
import nomiLogo from '../../../../assets/nomi.svg';
import emaLogo from '../../../../assets/ema.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class OurToolsSection extends Component {

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} >
        <Grid container className={classes.container}>
          <Grid xs={8}>
            <Typography
            variant="h3"
            color="textPrimary"
            align="left"
            paragraph
            >Our Tools</Typography>
            <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            paragraph
            >
            On the sidelines there are many, many exciting <Link href="https://substrate.io/ecosystem/projects/" 
            target="_blank" rel="noreferrer" color="inherit" 
            className={classes.link}>projects</Link> being built by top teams and community members, to enrich the Polkadot ecosystem and foster innovation in decentralized tech.
            </Typography>
            <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            paragraph
            >
            On the shoulders of these giant builders, <b>TurboFlakes</b> uses this awesome and open technology to create amazing tools designed to improve the experience of interacting with Substrate blockchain networks.
            </Typography>
            <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            paragraph
            >  
            From someone random thought, to collaborative brainstorms or just from listening other community members, we generate ideas and work tiressly to develop and craft these experiments.
            </Typography>
            <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            paragraph
            >
            Our tools are built in the wild, open-source and ready to be explored.
            </Typography>
            <Typography
            variant="body1"
            color="textPrimary"
            align="left"
            paragraph
            >
            Meet Nomi, Crunch, and Ema. <IconButton 
              color="inherit"
              size="small"
              aria-label="Menu">
              <ArrowRightIcon color="inherit" /></IconButton>
            </Typography>
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={4}></Grid>
          <Grid xs={8}>
            <Box className={classes.toolsBox}>
              <Link component="button" className={classes.botLink} 
                color="textPrimary"
                onClick={() => this.props.scrollIntoView("nomi")}>
                <img src={nomiLogo} className={classes.botLogo} alt={"nomi-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >NOMI
                </Typography>
              </Link>
              <Link component="button" className={classes.botLink} 
                color="textPrimary"
                onClick={() => this.props.scrollIntoView("crunch")}>
                <img src={crunchLogo} className={classes.botLogo} alt={"crunch-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >CRUNCH
                </Typography>
              </Link>
              <Link component="button" className={classes.botLink}  
                color="textPrimary"
                onClick={() => this.props.scrollIntoView("ema")}>
                <img src={emaLogo} className={classes.botLogo} alt={"ema-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >EMA
                </Typography>
              </Link> 
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

OurToolsSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({})


export default connect(mapStateToProps, {scrollIntoView})(withStyles(styles)(OurToolsSection));
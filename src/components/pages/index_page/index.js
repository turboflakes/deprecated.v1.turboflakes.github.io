import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import Link from '@material-ui/core/Link';
import NomiTool from '../../tools/nomi_tool'
import CrunchTool from '../../tools/crunch_tool'
import EmaTool from '../../tools/ema_tool'
import CocoTool from '../../tools/coco_tool'
import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import crunchLogo from '../../../assets/crunchbot.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class IndexPage extends Component {

  state = {
    view: undefined
  }

  handleNext = (view) => {
    this.setState({view})
    this.timeout = setTimeout(() => {
      this.setState({view: undefined})
    }, 100)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root}>
        <Box className={classes.heroBox}>
          <Box className={classes.logoBox} align="center">
            <img src={logo} className={classes.logo} alt={"logo"}/>
          </Box>
          <Box className={classes.motoBox}>
            <Typography
              variant="h2"
              color="textPrimary"
              align="center"
              gutterBottom
            >
              AND THE<br/>
              SUBSTRATE TOOLS GARAGE
            </Typography>
            <Typography
                variant="subtitle1"
                color="textPrimary"
                align="center"
              >
                Awesome <Link href="https://substrate.io/" 
                target="_blank" rel="noreferrer" color="inherit" 
                className={classes.link}>Substrate</Link> means <b>Bold</b> tools. 
                <b>TurboFlakes</b> provides end-user tooling <br/>to ease the experience of interacting with Substrate blockchain networks.
                {/* Turboflakes provides end-user tooling built on top of the awesome Substrate framework to easier the experience of interacting with Substrate blockchain networks. */}
                </Typography>
          </Box>
          <Box className={classes.toolsBox}>
            <Typography
                variant="subtitle2"
                color="textPrimary"
                align="center"
                gutterBottom
              >
                Meet Nomi, Crunch, and Ema
            </Typography>
            <Box className={classes.charactersBox}>
              <Link component="button" className={classes.characterLink} 
                onClick={() => this.handleNext("nomi")}>
                <img src={crunchLogo} className={classes.characterLogo} alt={"nomi-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >NOMI
                </Typography>
              </Link>
              <Link component="button" className={classes.characterLink} 
                onClick={() => this.handleNext("crunch")}>
                <img src={crunchLogo} className={classes.characterLogo} alt={"crunch-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >CRUNCH
                </Typography>
              </Link>
              <Link component="button" className={classes.characterLink}  
                onClick={() => this.handleNext("ema")}>
                <img src={crunchLogo} className={classes.characterLogo} alt={"ema-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >EMA
                </Typography>
              </Link> 
              {/* <Link component="button" className={classes.characterLink}   
                onClick={() => this.handleNext("coco")}>
                <img src={crunchLogo} className={classes.characterLogo} alt={"coco-logo"}/>
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                >COCO
                </Typography>
            </Link>*/}
            </Box>
          </Box>
          <Box className={classes.messageBox} >
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Tools built in the wild, open-source and ready to be explored.
            </Typography>
            <IconButton 
              onClick={() => this.handleNext("nomi")}
              color="inherit"
              aria-label="Menu">
              <KeyboardArrowDownIcon color="inherit" fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {/* Tool sections here */}
        <NomiTool scrollIntoView={this.state.view === "nomi"}/>
        <CrunchTool scrollIntoView={this.state.view === "crunch"}/>
        <EmaTool scrollIntoView={this.state.view === "ema"}/>
        <CocoTool scrollIntoView={this.state.view === "coco"}/>

      </Box>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexPage);
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {scrollIntoView} from '../../../actions/layout'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import NomiTool from '../../tools/nomi_tool'
import CrunchTool from '../../tools/crunch_tool'
import EmaTool from '../../tools/ema_tool'
import Scroll from '../../scroll'
// import CocoTool from '../../tools/coco_tool'
// import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import logo from '../../../assets/logo/logo_2_color_subtract_turboflakes_.svg';
import crunchLogo from '../../../assets/crunchbot.svg';
import nomiLogo from '../../../assets/nomi.svg';
import emaLogo from '../../../assets/ema.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class IndexPage extends Component {

  rootRef = React.createRef();

  componentDidUpdate(prevProps) {
    // Layout
    const {view} = this.props
    if (view === "top" && prevProps.view !== view) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  handleExt = () => {
		window.open('https://substrate.io/vision/substrate-and-polkadot/', '_blank')
	}

  render() {
    const { classes, view } = this.props;

    // Landing page height = window.innerHeight * 0.9
    // Substrate box height = 704
    // TurboFlakes tools box height = 1024
    const nomiTopY = (window.innerHeight * 0.9) + 704 + 1024
    const crunchTopY = nomiTopY + 384 + (window.innerHeight * 0.95)
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Box className={classes.heroBox}>
          <Box className={classes.logoBox} align="center">
            <img src={logo} className={classes.logo} alt={"logo"}/>
          </Box>
          <Box className={classes.motoBox}>
            <Box className={classes.titleBox}>
              <Box className={classes.substrate}>
                <Typography variant="h5" color="textPrimary" className={classes.support}>
                  <div>AND</div><div className={classes.the}>THE</div>
                </Typography>
                <Typography variant="h1" color="textPrimary" className={classes.title}>
                  SUBSTRATE
                </Typography>
              </Box>
              <Typography variant="h1" color="textPrimary" align="center" className={classes.title}>
                TOOLS GARAGE
              </Typography>
            </Box>
            <Typography
                variant="subtitle1"
                color="textPrimary"
                align="center"
              >
              Awesome <Link href="https://substrate.io/" 
              target="_blank" rel="noreferrer" color="inherit" 
              className={classes.link}>Substrate</Link> means bold tools. 
              {/* <b>TurboFlakes</b> provides end-user tooling <br/>to ease the experience of interacting with Substrate blockchain networks. */}
              <b>TurboFlakes</b> provides end-user <br/>tooling to help you to interact with Substrate blockchain networks. 
              {/* Turboflakes provides end-user tooling built on top of the awesome Substrate framework to easier the experience of interacting with Substrate blockchain networks. */}
            </Typography>
          </Box>
        </Box>          
        <Box className={classes.substrateBox} >
          <Grid container className={classes.container}>
            <Grid xs={8}>
              <Typography
              variant="h3"
              color="textSecondary"
              align="left"
              paragraph
              >Substrate & Polkadot</Typography>
              <Typography
              variant="body1"
              color="textSecondary"
              align="left"
              paragraph
              >
              Substrate is the blockchain framework that powers all the Polkadot ecosystem to be at the forefront innovation for the Web3 revolution. 
              </Typography>
              <Typography
              variant="body1"
              color="textSecondary"
              align="left"
              paragraph
              >
              Polkadot is a multichain network built by the same Substrate team, where most are the blockchain industry’s foremost builders.
              </Typography>
              <Typography
              variant="body1"
              color="textSecondary"
              align="left"
              paragraph
              >
              Polkadot aims to facilitate a fully functional and user-friendly decentralized web, where users are in control. A Web3 that looked like to far way, is gone. Web3 is hapening and is Hapening Now.
              </Typography>
              <Typography
              variant="body1"
              color="textSecondary"
              align="left"
              paragraph
              >
                To find out more about Substrate & Polkadot super powers, have a read here.  <IconButton 
                onClick={this.handleExt}
                color="inherit"
                size="small"
                aria-label="Menu">
                <ArrowRightIcon color="inherit" />
              </IconButton>
              </Typography>
            </Grid>
          </Grid>          
          {/* <IconButton 
            onClick={() => this.handleNext("nomi")}
            color="inherit"
            aria-label="Menu">
            <KeyboardArrowDownIcon color="inherit" fontSize="large" />
          </IconButton> */}
        </Box>

        <Box className={classes.meetBox} >
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
              On the shoulders of these giant coders from Polkadot, <b>TurboFlakes</b> uses this awesome, open technology to create amazing tools designed to improve the experience of interacting with Substrate blockchain networks.
              </Typography>
              <Typography
              variant="body1"
              color="textPrimary"
              align="left"
              paragraph
              >  
              From someone random thought, to collaborative brainstorms, or just from listening other community members, we generate ideas and work tiressly to develop and craft these experiments.
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
        
        {/* Tool sections here */}
        <NomiTool scrollHere={view === "nomi"} topY={nomiTopY} />
        <CrunchTool scrollHere={view === "crunch"}/>
        <EmaTool scrollHere={view === "ema"}/>
        {/* <CocoTool scrollIntoView={this.state.view === "coco"}/> */}
        <Scroll nomiTopY={nomiTopY} crunchTopY={crunchTopY}/>
      </Box>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  view: state.layout.view,
  isFetching: !!state.fetchers.async,
})


export default connect(mapStateToProps, {scrollIntoView})(withStyles(styles)(IndexPage));
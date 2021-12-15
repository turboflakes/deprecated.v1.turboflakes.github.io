import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {scrollIntoView} from '../../../actions/layout'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NomiTool from '../../tools/nomi_tool'
import CrunchTool from '../../tools/crunch_tool'
import EmaTool from '../../tools/ema_tool'
import Scroll from '../../scroll'
import SubstrateSection from './substrate_section'
import OurToolsSection from './our_tools_section'
import OurValidatorsSection from './our_validators_section'
// import CocoTool from '../../tools/coco_tool'
// import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import logo from '../../../assets/logo/logo_2_color_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class IndexPage extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    const {location} = this.props
    if (["#nomi", "#crunch", "#ema"].includes(location.hash)) {
      this.props.scrollIntoView(location.hash.substring(1))
    }
    this.removeHash()
  }
  
  componentDidUpdate(prevProps) {
    // Layout
    const {view} = this.props
    if (view === "top" && prevProps.view !== view) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  removeHash = () => {
		const {location, history} = this.props
    let query = new URLSearchParams(location.search)
		const l = {
      search: `?${query.toString()}`,
      hash: ''
		}
		history.replace(l)
	}

  render() {
    const { classes, view } = this.props;

    // Landing page height = window.innerHeight * 0.9
    // Substrate box height = 704
    // TurboFlakes tools box height = 1024
    const nomiTopY = (window.innerHeight * 0.9) + 704 + 1024
    const crunchTopY = nomiTopY + 384 + (window.innerHeight * 0.95)
    const emaTopY = crunchTopY + 1728
    
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
              <b>TurboFlakes</b> provides end-user <br/>tooling to help you to interact with Substrate blockchain networks.
            </Typography>
          </Box>
        </Box>    
        {/*  */}
        <SubstrateSection />
        {/*  */}
        <OurToolsSection />
        {/* Tool sections here */}
        <NomiTool scrollHere={view === "nomi"} topY={nomiTopY} />
        <CrunchTool scrollHere={view === "crunch"} />
        <EmaTool scrollHere={view === "ema"} />
        {/*  */}
        <OurValidatorsSection />
        {/*  */}
        {/* <CocoTool scrollIntoView={this.state.view === "coco"}/> */}
        <Scroll nomiTopY={nomiTopY} crunchTopY={crunchTopY} emaTopY={emaTopY} />
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


export default connect(mapStateToProps, {scrollIntoView})(withRouter(withStyles(styles)(IndexPage)));
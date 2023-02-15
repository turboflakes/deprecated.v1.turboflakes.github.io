import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {scrollIntoView} from '../../../actions/layout'
import Box from '@material-ui/core/Box';
import NomiTool from '../../tools/nomi_tool'
import CrunchTool from '../../tools/crunch_tool'
import ScoutyTool from '../../tools/scouty_tool'
import OnetTool from '../../tools/onet_tool'
// import EmaTool from '../../tools/ema_tool'
import PolkadotValidatorSection from './polkadot_validator_section'
import KusamaValidatorSection from './kusama_validator_section'
import Scroll from '../../scroll'
import HeroSection from './hero_section'
import SubstrateSection from './substrate_section'
import OurToolsSection from './our_tools_section'
import OurValidatorsSection from './our_validators_section'
// import CocoTool from '../../tools/coco_tool'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class IndexPage extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    const {location} = this.props

    if (["#nomi", "#crunch", "#scouty", "#ema", "#raiden", "#momo", "#coco"].includes(location.hash)) {
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
    const nomiTopY = (window.innerHeight * 0.95) + 704 + 1024
    const crunchTopY = nomiTopY + 496 + (window.innerHeight * 0.95)
    const scoutyTopY = crunchTopY + 1728
    // const emaTopY = scoutyTopY + 1984
    const onetTopY = scoutyTopY + 1984
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <HeroSection />    
        {/*  */}
        <SubstrateSection />
        {/*  */}
        <OurToolsSection />
        {/* Tool sections here */}
        {/* <NomiTool scrollHere={view === "nomi"} topY={nomiTopY} /> */}
        <CrunchTool scrollHere={view === "crunch"} />
        <ScoutyTool scrollHere={view === "scouty"} />
        <OnetTool scrollHere={view === "one-t"} />
        {/* <EmaTool scrollHere={view === "ema"} /> */}
        {/*  */}
        <OurValidatorsSection />
        {/* Validators here */}
        <PolkadotValidatorSection scrollHere={view === "raiden"} />
        <KusamaValidatorSection scrollHere={view === "momo" || view === "coco"} />
        {/*  */}
        {/* <CocoTool scrollIntoView={this.state.view === "coco"}/> */}
        <Scroll nomiTopY={nomiTopY} crunchTopY={crunchTopY} scoutyTopY={scoutyTopY} onetTopY={onetTopY} />
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
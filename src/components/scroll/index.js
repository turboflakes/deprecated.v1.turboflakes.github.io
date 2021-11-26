import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import _debounce from 'lodash/debounce';
import {scrollIntoView, clearView, disableScroll} from '../../actions/layout'

const NOMI_HEADER_HEIGHT = 384
const NOMI_SEARCH_HEIGHT = 92
const THRESHOLD = 4

const inside = (scrollY, valueY, t = THRESHOLD) => scrollY < valueY + t && scrollY > valueY - t

class Scroll extends Component {

  // Notes:
  // window.innerHeight = Landing page height
  // 384 => Nomi hero box height
  // 92 => Search box height
  state = {
    scrollY: 0,
    nomiSectionTop: window.innerHeight,
    nomiSectionTopOneQuarter: window.innerHeight + ((NOMI_HEADER_HEIGHT + NOMI_SEARCH_HEIGHT) / 4),
    nomiLeaderboardTopY: window.innerHeight + NOMI_HEADER_HEIGHT,
    nomiBoardTopY: window.innerHeight + NOMI_HEADER_HEIGHT + NOMI_SEARCH_HEIGHT,
    nomiBoardTopOneQuarter: window.innerHeight + NOMI_HEADER_HEIGHT + NOMI_SEARCH_HEIGHT + ((window.innerHeight * 0.9) / 4)
  }

  componentDidMount() {
    window.addEventListener('scroll', _debounce(this.handleScroll, 150, { 'trailing': true }));
  }

  componentDidUpdate(prevProps, prevState) {
    const {view} = this.props
    const {scrollY, nomiSectionTop, nomiLeaderboardTopY, 
      nomiBoardTopOneQuarter, nomiSectionTopOneQuarter} = this.state
    
    if (view === "leaderboard" && inside(scrollY, nomiLeaderboardTopY)) {
      this.props.disableScroll()
    }
    
    if (view === "" && 
      scrollY > window.innerHeight / 2  && 
      scrollY < nomiSectionTopOneQuarter &&
      !inside(scrollY, nomiSectionTop)) {
      this.props.scrollIntoView("nomi")
    }

    if (view === "" && 
      scrollY > nomiSectionTopOneQuarter &&
      scrollY < nomiBoardTopOneQuarter &&
      !inside(scrollY, nomiLeaderboardTopY)) {
      this.props.scrollIntoView("leaderboard")
    }
  }

  handleScrollFinished = () => {
    const {view} = this.props
    if (!!view) {
      this.props.clearView()
    }
  }

  handleScroll = (event) => {
    
    this.setState({scrollY: window.scrollY})
    
    if(this.timer !== null) {
      clearTimeout(this.timer);        
    }

    this.timer = setTimeout(this.handleScrollFinished, 150)
    
  }

 	render() {
    if (process.env.NODE_ENV === 'development') {
      return (
        <Box style={{
          zIndex: 99,
          position: "fixed",
          top: 2,
          left: 2
        }}> {this.state.scrollY} : {this.state.nomiLeaderboardTopY} 
        </Box>
    )}
    return null
	}
}

Scroll.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({ view: state.layout.view })

export default connect(mapStateToProps, {scrollIntoView, clearView, disableScroll})(Scroll);
import React, {Component} from 'react';
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box';
import _debounce from 'lodash/debounce';
import {scrollIntoView, clearView, disableScroll} from '../../actions/layout'

const NOMI_HEADER_HEIGHT = 384
const THRESHOLD = 4

const inside = (scrollY, valueY, t = THRESHOLD) => scrollY < valueY + t && scrollY > valueY - t

class Scroll extends Component {

  // Notes:
  // window.innerHeight = Landing page height
  // 384 => Nomi hero box height
  state = {
    scrollY: 0,
    nomiSectionTop: window.innerHeight,
    nomiSectionTopOneQuarter: window.innerHeight + ((NOMI_HEADER_HEIGHT) / 4),
    nomiSectionHalf: window.innerHeight + ((NOMI_HEADER_HEIGHT) / 2),
    nomiLeaderboardTop: window.innerHeight + (NOMI_HEADER_HEIGHT) - (0.05 * window.innerHeight),
    nomiBoardTop: window.innerHeight + NOMI_HEADER_HEIGHT,
    nomiBoardHalf: window.innerHeight + NOMI_HEADER_HEIGHT + ((window.innerHeight * 0.95) / 2),
    crunchSectionTop: window.innerHeight + NOMI_HEADER_HEIGHT + (window.innerHeight * 0.95),
    crunchSectionTopOneQuarter: window.innerHeight + NOMI_HEADER_HEIGHT + (window.innerHeight * 0.95) + (window.innerHeight / 4)
  }

  componentDidMount() {
    window.addEventListener('scroll', _debounce(this.handleScroll, 150, { 'trailing': true }));
  }

  handleScrollFinished = () => {
    const {view} = this.props
    const {scrollY, nomiSectionHalf, nomiLeaderboardTop, 
      nomiBoardHalf, crunchSectionTopOneQuarter} = this.state

    if (scrollY > 0  && scrollY < window.innerHeight / 6) {
        this.props.clearView()
        this.props.scrollIntoView("top")
    }
    
    if (scrollY >= (window.innerHeight * 5 / 6)  && scrollY < nomiSectionHalf) {
        this.props.clearView()
        this.props.scrollIntoView("nomi")
    }

    if (scrollY >= nomiSectionHalf && scrollY < nomiBoardHalf) {
        this.props.clearView()
        this.props.scrollIntoView("leaderboard")
    }

    if (view === "leaderboard" && inside(scrollY, nomiLeaderboardTop)) {
      this.props.disableScroll()
    }

    if (scrollY >= nomiBoardHalf &&
      scrollY < crunchSectionTopOneQuarter) {
        this.props.clearView()
        this.props.scrollIntoView("crunch")
    }
  }

  handleScroll = (event) => {
    
    this.setState({scrollY: window.scrollY})
    
    if(this.timer !== null) {
      clearTimeout(this.timer);        
    }

    this.timer = setTimeout(this.handleScrollFinished, 50)
    
  }

 	render() {
    if (process.env.NODE_ENV === 'development') {
      return (
        <Box style={{
          zIndex: 99,
          position: "fixed",
          top: 2,
          left: 2
        }}> {this.props.view} : {this.state.scrollY} : {window.innerHeight} :
        {this.state.nomiLeaderboardTop} : 
        {this.state.nomiBoardTop} :
        {this.state.nomiBoardHalf}
        </Box>
    )}
    return null
	}
}

const mapStateToProps = (state, ownProps) => ({ view: state.layout.view })

export default connect(mapStateToProps, {scrollIntoView, clearView, disableScroll})(Scroll);
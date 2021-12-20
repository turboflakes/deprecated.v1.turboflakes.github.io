import {Component} from 'react';
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce';
import {scrollIntoView, clearView, disableScroll} from '../../actions/layout'
// import Box from '@material-ui/core/Box';

const NOMI_HEADER_HEIGHT = 496
const SECTION_THRESHOLD = 192
const THRESHOLD = 4

const inside = (scrollY, valueY, t = THRESHOLD) => scrollY < valueY + t && scrollY > valueY - t

class Scroll extends Component {
  constructor(props) {
		super(props);
    // Notes:
    // Nomi hero box height = 496
    // NomiBoard height = window.innerHeight * 0.95
		this.state = { 
			scrollY: 0,
      nomiSectionTopOneQuarter: props.nomiTopY + ((NOMI_HEADER_HEIGHT) / 4),
      nomiSectionHalf: props.nomiTopY + ((NOMI_HEADER_HEIGHT) / 2),
      nomiLeaderboardTop: props.nomiTopY + NOMI_HEADER_HEIGHT - (0.05 * window.innerHeight),
      nomiBoardTop: props.nomiTopY + NOMI_HEADER_HEIGHT,
      nomiBoardHalf: props.nomiTopY + NOMI_HEADER_HEIGHT + ((window.innerHeight * 0.95) / 2),
		}
	}

  componentDidMount() {
    window.addEventListener('scroll', _debounce(this.handleScroll, 150, { 'trailing': true }));
  }

  handleScrollFinished = () => {
    const {view, nomiTopY, crunchTopY, emaTopY} = this.props
    const {scrollY, nomiSectionHalf, nomiLeaderboardTop, 
      nomiBoardHalf} = this.state

    if (scrollY > 0  && scrollY < window.innerHeight / 6) {
        this.props.clearView()
        this.props.scrollIntoView("top")
    }
    
    if (scrollY >= (nomiTopY - SECTION_THRESHOLD) && scrollY < (nomiTopY + SECTION_THRESHOLD)) {
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
      scrollY < (crunchTopY + SECTION_THRESHOLD)) {
        this.props.clearView()
        this.props.scrollIntoView("crunch")
    }

    if (scrollY >= (emaTopY - SECTION_THRESHOLD) &&
      scrollY < (emaTopY + SECTION_THRESHOLD)) {
        this.props.clearView()
        this.props.scrollIntoView("ema")
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
    // if (process.env.NODE_ENV === 'development') {
    //   return (
    //     <Box style={{
    //       zIndex: 99,
    //       position: "fixed",
    //       top: 2,
    //       left: 2
    //     }}> {this.props.view} : {this.state.scrollY} : {this.props.nomiTopY} : 
    //     {this.props.crunchTopY}
    //     </Box>
    // )}
    return null
	}
}

const mapStateToProps = (state, ownProps) => ({ view: state.layout.view })

export default connect(mapStateToProps, {scrollIntoView, clearView, disableScroll})(Scroll);
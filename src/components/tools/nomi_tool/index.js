import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { selectors } from '../../../selectors'
import { selectAddress, clearAddress } from '../../../actions/leaderboard'
import {scrollIntoView} from '../../../actions/layout'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import BoardAnimation from './board_animation'
import Leaderboard from './leaderboard'
import AccountInfoTable from './account_info_table'
import nomiLogo from '../../../assets/nomi.svg';
import nomiHead from '../../../assets/nomi_head_white.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styles from './styles'

class NomiTool extends Component {

  rootRef = React.createRef();
  watermarkRef = React.createRef();
  headWatermarkRef = React.createRef();

  componentDidMount() {
    const {scrollHere} = this.props
    if (scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
    if (this.watermarkRef.current) {
      this.watermarkRef.current.addEventListener('animationend', this.handleAnimationEnd, false);
    }
    if (this.headWatermarkRef.current) {
      this.headWatermarkRef.current.addEventListener('animationend', this.handleAnimationEnd, false);
    }
  }

  componentDidUpdate(prevProps) {
    const {scrollHere} = this.props
    if (scrollHere && prevProps.scrollHere !== scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  componentWillUnmount() {
    if (this.watermarkRef.current) {
      this.watermarkRef.current.removeEventListener('animationend', this.handleAnimationEnd, false);
    }
    if (this.headWatermarkRef.current) {
      this.headWatermarkRef.current.removeEventListener('animationend', this.handleAnimationEnd, false);
    }
  }

  handleAnimationEnd = (event) => {
    const {scrollable} = this.props
    if (scrollable) {
      event.target.className += ` invisible`
    }
  }

  changeParams = (query, value) => {
		const {history} = this.props
		query.set("a", value)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

  deleteParams = (query) => {
		const {history} = this.props
		query.delete("a")
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}
  
  removeAddress = () => {
    const {location} = this.props
    let query = new URLSearchParams(location.search)
    this.deleteParams(query)
    this.props.clearAddress()
  }

  handleOnBallClick = (address) => {
    if (!!address) {
      const {location} = this.props
      let query = new URLSearchParams(location.search)
      this.changeParams(query, address)
      this.props.selectAddress(address)
    }
  }

  handleOnBallClear = () => {
    this.removeAddress()
  }

  handleOnAccountInfoClose = () => {
    this.removeAddress()
  }

  render() {
    const { classes, width, network, addresses, selected, topY, scrollable } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Grid container className={classNames(classes.container, classes.section)}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.titleBox}>
              <Box align="left">
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                    >NOMI
                  </Typography>
                  <Box className={classes.nameBase}> </Box>
                </Box>
              </Box>
              <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                  paragraph
                >
                  <b>Nomi</b> is a decision support tool for Nominators in NPoS networks.
              </Typography>
              <Chip label="beta version" color='primary'/>
              {!isWidthUp('lg', width, true) ?
                  <Typography
                  variant="body1"
                  className={classes.highlightMsg}
                  color="textSecondary"
                  align="left"
                  >
                  Reach a bigger screen to get <b>Nomi's</b> full experience!
                  </Typography>
               : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} align="right">
            <Box align="right" className={classes.logoBox}>
              <img src={nomiLogo} 
                className={classNames(classes.logo)} 
                alt={"nomi logo"}/>
            </Box>
          </Grid>
        </Grid>
        {isWidthUp('lg', width, true) ? 
          <Box className={classes.animationBox}>
            <Typography
                ref={this.watermarkRef}
                variant="h4"
                className={
                  classNames(classes.watermark, 
                    !scrollable ? classes.visible : null,
                    !scrollable ? classes.logoAnimateInLeft : classes.logoAnimateFadeOutLeft
                  )} align="left"
              >NOMI
            </Typography>
            <img 
              ref={this.headWatermarkRef}
              src={nomiHead} 
              className={classNames(classes.headWatermark, 
                !scrollable ? classes.visible : null,
                !scrollable ? classes.logoAnimateInLeft : classes.logoAnimateFadeOutLeft 
                )} alt={"Icon"}/>
            <BoardAnimation 
              network={network}
              addresses={addresses}
              selected={selected}
              width={window.innerWidth} 
              height={window.innerHeight * 0.95}
              topY={topY + 496} // heroBox height = 496
              onBallClick={this.handleOnBallClick}
              onBallClear={this.handleOnBallClear} />
            <AccountInfoTable onClose={this.handleOnAccountInfoClose} />
            <Leaderboard />
          </Box> : null}
      </Box>
    )
  }
}

NomiTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const scrollable = state.layout.scrollable
  const view = state.layout.view
  const quantity = state.leaderboard.quantity
  const selected = state.leaderboard.selected
  const network = selectors.getApiNetwork(state)
  const addresses = selectors.getBoardAddresses(state)
  return {
    scrollable,
    view,
    quantity,
    selected,
    network,
    addresses,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAddress, clearAddress, scrollIntoView})(withWidth()(withRouter(withStyles(styles)(NomiTool))));

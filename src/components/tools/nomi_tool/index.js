import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { selectors } from '../../../selectors'
import { selectAddress, clearAddress } from '../../../actions/leaderboard'
import {scrollIntoView} from '../../../actions/layout'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BoardAnimation from './board_animation'
import Leaderboard from './leaderboard'
import AccountInfoTable from './account_info_table'
import nomiLogo from '../../../assets/nomi.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NomiTool extends Component {

  rootRef = React.createRef();

  componentDidUpdate(prevProps) {
    const {scrollHere} = this.props
    if (scrollHere && prevProps.scrollHere !== scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  handleOnBallClick = (address) => {
    if (!!address) {
      this.props.selectAddress(address)
    }
  }

  handleOnBallClear = () => {
    this.props.clearAddress()
  }

  render() {
    const { classes, network, addresses, selected, view, scrollable } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Box className={classes.heroBox}>
          <Box className={classes.titleBox}>
            {/* <Typography
                variant="h2"
                className={classes.meet}
                color="textPrimary"
                align="left"
              >Meet
            </Typography> */}
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
                <b>Nomi</b> is a nominator decision support tool for NPoS networks.
            </Typography>
          </Box>
          <Box align="right" className={classes.logoBox}>
            <img src={nomiLogo} 
            className={classNames(classes.logo,
              view === "leaderboard" ? classes.logoAnimateOutRight : null,
              !scrollable ? classes.logoFixedBoard : null,
              !scrollable ? classes.logoAnimateInLeft : null,
              )} alt={"nomi logo"}/>
          </Box>
        </Box>
        <Box className={classes.animationBox}>
          <Typography
              variant="h4"
              className={classes.watermark}
              align="left"
            >NOMI
          </Typography>
          <BoardAnimation 
            network={network}
            addresses={addresses}
            selected={selected}
            width={window.innerWidth} 
            height={window.innerHeight * 0.95}
            onBallClick={this.handleOnBallClick}
            onBallClear={this.handleOnBallClear} />
          <AccountInfoTable />
          <Leaderboard />
        </Box>
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
  const addresses = selectors.getIdsByEntityAndLastQuery(state, 'validator', 'addresses')
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

export default connect(mapStateToProps, {selectAddress, clearAddress, scrollIntoView})(withWidth()(withStyles(styles)(NomiTool)));

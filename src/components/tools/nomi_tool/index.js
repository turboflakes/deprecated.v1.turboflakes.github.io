import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../../selectors'
import serialize from '../../../utils/serialize'
import { selectAddress, clearAddress } from '../../../actions/leaderboard'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BoardAnimation from './board_animation'
import Search from './search'
import Leaderboard from './leaderboard'
import AccountInfoTable from './account_info_table'
import nomiLogo from '../../../assets/nomi.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NomiTool extends Component {

  rootRef = React.createRef();

  componentDidUpdate(prevProps) {
    const {scrollIntoView} = this.props
    if (scrollIntoView && prevProps.scrollIntoView !== scrollIntoView) {
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
    const { classes, addresses, selected } = this.props;
    
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
            <img src={nomiLogo} className={classes.logo} alt={"nomi logo"}/>
          </Box>
        </Box>
        <Box className={classes.searchBox} align="center">
          <Search />
        </Box>
        <Box className={classes.animationBox}>
          <Typography
              variant="h4"
              className={classes.watermark}
              align="left"
            >NOMI
          </Typography>
          <BoardAnimation 
              addresses={addresses}
              selected={selected}
              width={window.innerWidth} 
              height={window.innerHeight * 0.9}
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
  const weights = state.leaderboard.weights
  const ranges = state.leaderboard.ranges
  const quantity = state.leaderboard.quantity
  const selected = state.leaderboard.selected
  const query = serialize({q: "Board", w: weights, r: ranges, n: quantity})
  const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
  return {
    quantity,
    selected,
    addresses,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAddress, clearAddress})(withWidth()(withStyles(styles)(NomiTool)));

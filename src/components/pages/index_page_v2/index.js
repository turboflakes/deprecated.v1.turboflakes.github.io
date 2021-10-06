import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../../selectors'
import serialize from '../../../utils/serialize'
import { selectAddress, clearAddress } from '../../../actions/leaderboard'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Alert from '../../alert'
import Leaderboard from '../../leaderboard'
// import ControlPanel from '../../control_panel'
import AccountInfoTable from '../../account_info_table'
import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NewIndexPage extends Component {

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
      <Box className={classes.root}>
        <Box className={classes.heroBox}>
          <Box align="center">
            <img src={logo} className={classes.logo} alt={"logo"}/>
          </Box>
          <Typography
            variant="h2"
            className={classes.inline}
            color="textPrimary"
            align="center"
          >
            HELPS YOU TO<br/>
            DISCOVER VALIDATORS
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.inline}
            color="textPrimary"
            align="center"
          >
            Earn Rewards on Digital Assets
          </Typography>
        </Box>
        <Box className={classes.animationBox}>
          <BoardAnimation 
              addresses={addresses}
              selected={selected}
              width={window.innerWidth} 
              height={window.innerHeight * 0.9}
              onBallClick={this.handleOnBallClick}
              onBallClear={this.handleOnBallClear} />
          <AccountInfoTable />
        </Box>
        <Leaderboard />
      </Box>
    )
  }
}

NewIndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const weights = state.leaderboard.weights
  const quantity = state.leaderboard.quantity
  const selected = state.leaderboard.selected
  const query = serialize({q: "Board", w: weights, n: quantity})
  const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
  return {
    quantity,
    selected,
    addresses,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAddress, clearAddress})(withWidth()(withStyles(styles)(NewIndexPage)));

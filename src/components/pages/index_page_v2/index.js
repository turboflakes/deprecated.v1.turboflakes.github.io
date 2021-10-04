import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Alert from '../../alert'
import Leaderboard from '../../leaderboard'
// import ControlPanel from '../../control_panel'
import AccountInfo from '../../account_info'
import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NewIndexPage extends Component {

  render() {
    const { classes, quantity, selected } = this.props;
    
    return (
      <Box className={classes.root}>
        {/* <Box classes={{ root: classes.rootContainer}}>  
          <Grid container spacing={0}>
            <Grid item xs={12} sm={!!selected ? 4 : 6}>
              <Leaderboard />
            </Grid>
            {!!selected ? 
              <Grid item xs={12} sm={4}>
                <AccountInfo />
              </Grid> : null}
            <Grid item xs={12} sm={!!selected ? 4 : 6}>
              <ControlPanel />
            </Grid>
          </Grid>
        </Box> */}
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
        <Box className={classes.animation}>
          <BoardAnimation 
              n={quantity}
              width={window.innerWidth} 
              height={window.innerHeight} />
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
  const quantity = state.leaderboard.quantity
  const selected = state.leaderboard.selected
  return {
    quantity,
    selected,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(NewIndexPage)));

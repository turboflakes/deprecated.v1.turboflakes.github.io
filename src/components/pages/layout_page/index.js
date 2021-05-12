import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Leaderboard from '../../leaderboard'
import ControlPanel from '../../control_panel'
import AccountInfo from '../../account_info'
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutPage extends Component {

  render() {
    const { classes, quantity, selected } = this.props;
    
    return (
      <div className={classes.root}>
        <Box className={classes.leftBox} 
          style={!!selected ? {width: `${100/3}vw`} : {width: "50vw"}}>
          <BoardAnimation 
            n={quantity} 
            width={!!selected ? window.innerWidth / 3 : window.innerWidth / 2} 
            height={window.innerHeight} />
        </Box>
        <Box className={classes.rightBox}
          style={!!selected ? {width: `${100*(1-1/3)}vw`} : {width: "50vw"}}>
          <Header />
          <Container className={classes.container}>  
            <Grid container spacing={0}>
              <Grid item xs={!!selected ? 4 : 6}>
                <ControlPanel />
              </Grid>
              <Grid item xs={!!selected ? 4 : 6}>
                <Leaderboard />
              </Grid>
              {!!selected ? 
                <Grid item xs={4}>
                  <AccountInfo />
                </Grid> : null}
            </Grid>
          </Container>
          <Footer style={!!selected ? {width: `${100*(1-1/3)}vw`} : {width: "50vw"}} />
        </Box>
      </div>
    )
  }
}

LayoutPage.propTypes = {
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

export default connect(mapStateToProps)(withStyles(styles)(LayoutPage));

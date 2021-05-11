import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Leaderboard from '../../leaderboard'
import ControlPanel from '../../control_panel'
// import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutPage extends Component {

  render() {
    const { classes, quantity, isFetching } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <BoardAnimation n={quantity} width={window.innerWidth / 2} height={window.innerHeight} />
          </Grid>
          <Grid item xs={6} className={classes.rightBoard}>
            <Header />
            <Container className={classes.container}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Leaderboard />
                </Grid>
                <Grid item xs={6}>
                  <ControlPanel />
                </Grid>
              </Grid>              
            </Container>
            {/* <Footer /> */}
          </Grid>
        </Grid>
      </div>
    )
  }
}

LayoutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const quantity = state.leaderboard.quantity
  return {
    quantity,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LayoutPage));

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Container from '../../container'
// import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutPage extends Component {

  render() {
    const { classes, isFetching } = this.props;

    return (
      <div className={classes.root}>
        {isFetching ? "fetching.." : null}
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <BoardAnimation n={16} width={window.innerWidth / 2} height={window.innerHeight} />
          </Grid>
          <Grid item xs={6} className={classes.rightContent}>
            <Header />
            {/* <ControlPanel /> */}
            <Container />
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
  return {
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LayoutPage));

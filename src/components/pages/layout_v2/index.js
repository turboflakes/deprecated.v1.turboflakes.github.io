import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { info } from '../../../actions/api'
import Box from '@material-ui/core/Box';
import BoardAnimation from '../../board_animation'
import Header from '../../header'
import Alert from '../../alert'
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styles from './styles'

class Layout extends Component {

  componentDidMount() {
    this.props.info()
  }
  
  render() {
    const { classes, width, quantity, selected } = this.props;
    
    return (
      <div className={classes.root}>
        <Header />
        <Alert />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
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

export default connect(mapStateToProps, {info})(withWidth()(withStyles(styles)(Layout)));

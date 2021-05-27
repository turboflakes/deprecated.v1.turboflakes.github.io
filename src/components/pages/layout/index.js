import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { info } from '../../../actions/api'
import Box from '@material-ui/core/Box';
import BoardAnimation from '../../board_animation'
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
        {isWidthUp('sm', width) ?
          <Box className={classes.leftBox} 
            style={!!selected ? {width: `${100/3}vw`} : {width: "50vw"}}>
            <BoardAnimation 
              n={quantity} 
              width={!!selected ? window.innerWidth / 3 : window.innerWidth / 2} 
              height={window.innerHeight} />
          </Box> : null}
        <Box className={classes.rightBox}
          style={isWidthUp('sm', width) ? (!!selected ? {width: `${100*(1-1/3)}vw`} : {width: "50vw"}) : ({width: "100vw"})}>
          {this.props.children}
          <Footer style={isWidthUp('sm', width) ? (!!selected ? {width: `${100*(1-1/3)}vw`} : {width: "50vw"}) : ({width: "100vw"})} />
        </Box>
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

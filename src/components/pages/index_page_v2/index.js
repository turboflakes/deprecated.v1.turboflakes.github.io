import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from '../../header'
import Alert from '../../alert'
import Leaderboard from '../../leaderboard'
import ControlPanel from '../../control_panel'
import AccountInfo from '../../account_info'
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NewIndexPage extends Component {

  render() {
    const { classes, selected } = this.props;
    
    return (
      <React.Fragment>
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
      </React.Fragment>
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

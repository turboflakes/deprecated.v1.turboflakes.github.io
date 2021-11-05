import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import crunchLogo from '../../../assets/crunchbot.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class CrunchTool extends Component {

  rootRef = React.createRef();

  componentDidUpdate(prevProps) {
    const {scrollIntoView} = this.props
    if (scrollIntoView && prevProps.scrollIntoView !== scrollIntoView) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.toolTitle}>
              <Typography
                  variant="h1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                >CRUNCH
              </Typography>
              <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  align="left"
                >
                  <b>Crunch</b> is a command-line interface to claim staking rewards 
                  every X hours for substrate-based chains. But in the matrix - <b>Crunch</b> is also an awesome bot.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.crunchBox}>
            <Box align="center">
              <img src={crunchLogo} className={classes.crunchLogo} alt={"logo"}/>
            </Box>
          </Grid>
        </Grid>
      </Box> 
    )
  }
}

CrunchTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrunchTool);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import crunchLogo from '../../../assets/crunchbot.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class EmaTool extends Component {

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
                >
                  {/* <span className={classes.meet}>Meet</span>  */}
                  EMA
              </Typography>
              <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                >
                  <b>Ema</b> submits <b>e</b>xtrinsics over <b>ma</b>trix. 
                  <br/>Publicly or private, <b>Ema</b> bot is always available for a brief text message exchange.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.emaBox}>
            <Box align="center">
              <img src={crunchLogo} className={classes.emaLogo} alt={"logo"}/>
            </Box>
          </Grid>
        </Grid>
      </Box> 
    )
  }
}

EmaTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmaTool);
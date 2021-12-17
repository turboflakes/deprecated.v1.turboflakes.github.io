import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import emaLogo from '../../../assets/ema.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class EmaTool extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    const {scrollHere} = this.props
    if (scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  componentDidUpdate(prevProps) {
    const {scrollHere} = this.props
    if (scrollHere && prevProps.scrollHere !== scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Grid container className={classNames(classes.container, classes.section)}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.titleBox}>
              <Box align="left">
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                    >EMA
                  </Typography>
                  <Box className={classes.nameBase}> </Box>
                </Box>
              </Box>
              <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                  paragraph
                >
                  Hey, what about a brief text messaging?
              </Typography>
              <Typography
                  variant="body1"
                  className={classes.highlightMsg}
                  color="textSecondary"
                  align="left"
                >
                <b className={classes.sender}>ema</b><br/> I am coming soon 😉
              </Typography>
              {/* <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                >
                  <b>Ema</b> submits <b>e</b>xtrinsics over <b>ma</b>trix. 
                  <br/>On public or private <Link href="https://matrix.org/" target="_blank" rel="noreferrer" color="inherit" 
                    className={classes.link}>matrix</Link> rooms → <b>Ema</b> bot is always available for a brief text message exchange.
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} align="right">
            <Box align="right" className={classes.logoBox}>
              <img src={emaLogo} className={classes.logo} alt={"ema tool"}/>
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
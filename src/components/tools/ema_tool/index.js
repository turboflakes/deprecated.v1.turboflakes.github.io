import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import emaLogo from '../../../assets/ema.png';
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
        <Box className={classes.container}>
          <Box className={classes.section} align="center">
            <Box className={classes.heroBox}>
              <Box className={classes.titleBox}>
                <Typography
                    variant="h2"
                    className={classes.meet}
                    color="textPrimary"
                    align="left"
                  >Meet
                </Typography>
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
                  >
                    <b>Ema</b> submits <b>e</b>xtrinsics over <b>ma</b>trix. 
                    <br/>On public or private <Link href="https://matrix.org/" target="_blank" rel="noreferrer" color="inherit" 
                      className={classes.link}>matrix</Link> rooms → <b>Ema</b> bot is always available for a brief text message exchange.
                </Typography>
              </Box>
              <Box align="right" className={classes.logoBox}>
                <img src={emaLogo} className={classes.logo} alt={"ema logo"}/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    )
  }
}

EmaTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmaTool);
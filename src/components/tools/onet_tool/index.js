import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import Typography from '@material-ui/core/Typography';
import onetLogo from '../../../assets/onet.svg';
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

  handleExt = () => {
		window.open('https://github.com/turboflakes/one-t', '_blank')
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
                    >ONE-T
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
                <b>ONE-T</b> is a performance report bot for the Polkadot and Kusama network with special focus on the <b>One T</b>housand validator programme.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} align="right">
            <Box align="right" className={classes.logoBox}>
              <img src={onetLogo} className={classes.logo} alt={"one-t tool"}/>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={9}>
            <Box className={classes.section} align="left">
              <Typography
                  variant="h3"
                  color="textPrimary"
                  align="left"
                  paragraph
                >Why subscribe for ONE-T reports?
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
                To get a general overview about the state of the Polkadot or Kusama network.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
                To promote <Link href="https://matrix.org/" 
                target="_blank" rel="noreferrer" color="inherit" 
                className={classes.link}>TVP validators</Link> and get a sense of how impactful these contribute to the network.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              To know how well validators are performing compared to their peers while assigned as para-validators. And warn about low-performance validators so that operators could take action.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              To get a glimpse of which Parachains are validators earning more points from.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              To give any token holder an additional tool when researching by Validators to Nominate.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12}sm={8}>
            <Box className={classes.section}>
              <Typography
                variant="h3"
                color="textPrimary"
                align="left"
                paragraph
              >How to subscribe on ONE-T
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
                >Join ONE-T matrix public rooms below and hit <code>!subscribe stash_address</code> to subscribe the <i>Validator Performance Report</i> of your favourite validators.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
                >To know more about ONE-T, please read here <IconButton 
                onClick={this.handleExt}
                  color="inherit"
                  size="small"
                  aria-label="Menu">
                  <ArrowRightIcon color="inherit" />
                </IconButton>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>            
          <Grid item xs sm={3}>
          </Grid>
          <Grid item xs={12} sm={3} align="center">
            <Link className={classNames(classes.link, classes.room)}
                color="textPrimary" target="_blank" rel="noreferrer"
                href="https://matrix.to/#/%23polkadot-one-t-bot:matrix.org">
              <img style={{width: 80}} 
                    src="https://github.com/turboflakes/one-t/blob/main/assets/one-t-polkadot-avatar-128.png?raw=true" alt="" />
              <Typography
                component="span"
                variant="h5"
                color="textPrimary"
                >Polkadot
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} align="center">
            <Link className={classNames(classes.link, classes.room)}
              color="textPrimary" target="_blank" rel="noreferrer"
              href="https://matrix.to/#/%23kusama-one-t-bot:matrix.org">
              <img style={{width: 80}} 
                    src="https://github.com/turboflakes/one-t/blob/main/assets/one-t-kusama-avatar-128.png?raw=true" alt="" />
              <Typography
                component="span"
                variant="h5"
                color="textPrimary"
                >Kusama
              </Typography>
            </Link>
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
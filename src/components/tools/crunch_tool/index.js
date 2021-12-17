import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import CodeBlock from '../../code_block';
import crunchLogo from '../../../assets/crunchbot.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const gist1 = `#!/bin/bash
# if running a local node than simple run crunch with default options
crunch rewards
# or be specific to which network crunch will try to connect
crunch kusama rewards
# or for Polkadot network and claiming rewards once a day at a specific time
crunch polkadot rewards daily
# or for Westend network and claiming rewards every 6 hours at a specific time
crunch westend rewards turbo
# or try flakes just for fun :)
crunch flakes
# to list all options try help
crunch help
`
class CrunchTool extends Component {

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
		window.open('https://github.com/turboflakes/crunch', '_blank')
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
                    >CRUNCH
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
                  <b>Crunch</b> is a command-line interface to easily automate payouts of staking rewards on Substrate-based chains.
              </Typography>
            </Box>
            </Grid>
            <Grid item xs={12} sm={4} align="right">
            <Box align="right" className={classes.logoBox}>
              <img src={crunchLogo} className={classes.logo} alt={"crunch tool"}/>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.section} align="left">
              <Typography
                  variant="h3"
                  color="textPrimary"
                  align="left"
                  paragraph
                >Why use Crunch?
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
                To claim staking rewards for one or a bunch of Validators at the end of each Era. 
                Maybe to get notifications about the amount and rate of the staking rewards and be informed about era stats for each Validator.
                For Nominators in private or public rooms be able to check specific Validators performance.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item sm={4}/>
          <Grid item xs={12} sm={8}>
            <Box className={classes.section}>
              <CodeBlock>
                {gist1}
              </CodeBlock>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                
                >Use <b>Crunch</b> by default or with custom options. To know more about <b>Crunch</b> and installation instructions, please read here <IconButton 
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
          <Grid item xs={12} sm={8}>
            <Box className={classes.section}>
              <Typography
                variant="h3"
                color="textPrimary"
                align="left"
                paragraph
              ><b>Crunch</b> + <Link href="https://matrix.org/" 
                target="_blank" rel="noreferrer" color="inherit" 
                className={classes.link}>Matrix</Link> Awesome CRUNCHBOT
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
                >Join and read the messages history of all the matrix public rooms where <b>Crunch</b> bots are sending in messages
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
                href="https://matrix.to/#/%23polkadot-crunch-bot:matrix.org">
              <img style={{width: 80}} 
                    src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-polkadot-room-128.png?raw=true" alt="" />
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
              href="https://matrix.to/#/%23kusama-crunch-bot:matrix.org">
              <img style={{width: 80}} 
                    src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-kusama-room-128.png?raw=true" alt="" />
              <Typography
                component="span"
                variant="h5"
                color="textPrimary"
                >Kusama
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} align="center">
            <Link className={classNames(classes.link, classes.room)}
                color="textPrimary" target="_blank" rel="noreferrer"
                href="https://matrix.to/#/%23westend-crunch-bot:matrix.org">
              <img style={{width: 80}} 
                    src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-westend-room-128.png?raw=true" alt="" />
              <Typography
                component="span"
                variant="h5"
                color="textPrimary"
                >Westend
              </Typography>
            </Link>
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
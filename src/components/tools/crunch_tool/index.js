import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
              <Box align="right" className={classes.logoBox}>
                <img src={crunchLogo} className={classes.logo} alt={"crunch logo"}/>
              </Box>
            </Box>
          </Box>
          {/*  */}
          <Box className={classes.section} align="center">
            <Typography
                variant="h3"
                color="textPrimary"
                align="center"
                className={classes.subtitle}
                paragraph
                gutterBottom
              >Why use Crunch?
            </Typography>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              align="center"
              paragraph
            >
              To claim staking rewards for one or a bunch of Validators at the end of each Era. 
              Maybe to get notifications about the amount and rate of the staking rewards and be informed about era stats for each Validator.
              For Nominators in private or public rooms be able to check specific Validators performance.
            </Typography>
          </Box>
          {/*  */}
          <Box className={classes.section} align="center">
            <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                paragraph
              >Use <b>Crunch</b> by default or with custom options.
            </Typography>
            <CodeBlock>
              {gist1}
            </CodeBlock>
            <Typography
              variant="body1"
              color="textPrimary"
              align="center"
              paragraph
              >Install <b>Crunch</b> by reading the instructions <Link href="https://github.com/turboflakes/crunch" 
              target="_blank" rel="noreferrer" color="inherit" 
              className={classes.link}>here</Link>.
            </Typography>
          </Box>
            {/* --- */}
            <Box className={classes.section} align="center">
            <Grid container alignItems="center">
              <Grid item xs={6}>
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
                  variant="subtitle1"
                  color="textPrimary"
                  align="left"
                  paragraph
                  >Join and read the messages history of all the matrix public rooms where <b>Crunch</b> bots are sending in messages
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Link className={classes.room} button
                  href="https://matrix.to/#/%23westend-crunch-bot:matrix.org">
                  <img style={{width: 80}} 
                        src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-westend-room-128.png?raw=true" alt="" />
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    align="center"
                    paragraph
                    >Westend
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link className={classes.room} button
                  href="https://matrix.to/#/%23kusama-crunch-bot:matrix.org">
                  <img style={{width: 80}} 
                        src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-kusama-room-128.png?raw=true" alt="" />
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    align="center"
                    paragraph
                    >Kusama
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link className={classes.room} button
                  href="https://matrix.to/#/%23polkadot-crunch-bot:matrix.org">
                  <img style={{width: 80}} 
                        src="https://github.com/turboflakes/crunch/blob/assets/crunchbot-polkadot-room-128.png?raw=true" alt="" />
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    align="center"
                    paragraph
                    >Polkadot
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box> 
        </Box>
      </Box> 
    )
  }
}

CrunchTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrunchTool);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CodeBlock from '../../code_block';
import crunchLogo from '../../../assets/crunchbot_plus_tokens.svg';
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
        <Box className={classes.container}>
          <Box className={classes.heroBox}>
            <Box className={classes.titleBox}>
              <Typography
                  variant="h2"
                  className={classes.meet}
                  color="textPrimary"
                >Meet
              </Typography>
              <Typography
                  variant="h1"
                  color="textPrimary"
                  paragraph
                >CRUNCH
              </Typography>
              <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  paragraph
                >
                  <b>Crunch</b> is a command-line interface to easily automate payouts of staking rewards on Substrate-based chains.
              </Typography>
            </Box>
            <Box align="center" className={classes.logoBox}>
              <img src={crunchLogo} className={classes.logo} alt={"crunch logo"}/>
            </Box>
          </Box>
          
          <Box className={classes.body}>
            
            <Typography
                variant="h3"
                color="textPrimary"
                align="center"
                paragraph
              >Why use Crunch?
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              align="center"
              paragraph
            >
              To claim staking rewards for just one or a list of Validators at the end of each Era or every X hours.
              <br/>To get notified about the amount and rate of the total staking rewards each Validator and their Nominators got.
              <br/>To be informed about era stats for each Validator, e.g. inclusion rate, claimed rewards rate, era points trend, active for current era.
              <br/>To easily inspect about any unclaimed eras for a given Validator stash.
              <br/>To promote Validators by publicly publish their automated staking rewards to a public Crunch Bot room.
              <br/>For Nominators in private or public rooms be able to check their chosen Validators rewards performance.
            </Typography>
            {/*  */}
            <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                paragraph
              >Use <b>Crunch</b> by default or with custom options.
            </Typography>
            <CodeBlock>
              {`#!/bin/bash
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
`}
            </CodeBlock>
            <Typography
              variant="body1"
              color="textPrimary"
              align="center"
              paragraph
              >To install <b>Crunch</b> follow instructions <Link href="https://github.com/turboflakes/crunch" 
              target="_blank" rel="noreferrer" color="inherit" 
              className={classes.link}>here</Link>.
            </Typography>
            {/* --- */}
            <Typography
                variant="h3"
                color="textPrimary"
                align="center"
                paragraph
              >CRUNCHBOT
            </Typography>
            <Typography
                variant="subtitle1"
                color="textPrimary"
                align="center"
                paragraph
              >
                <b>Crunch</b> is also an awesome <b>bot</b> in the <Link href="https://matrix.org/" 
                target="_blank" rel="noreferrer" color="inherit" 
                className={classes.link}>matrix</Link>.
            </Typography>
            <Box className={classes.list}>
              <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                paragraph
                >Join and read the messages history of all the Public Rooms for which Crunch Bots are sending messages
              </Typography>
              <Box className={classes.rooms}>
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
              </Box>
            </Box>
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
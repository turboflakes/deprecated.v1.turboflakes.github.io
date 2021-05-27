import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AboutPage extends Component {

  render() {
    const { classes } = this.props;
    
    return (
      <Container className={classes.root}>
        <IconButton aria-label="Back" color="primary" href="/" className={classes.backIcon}>
          <ArrowBackIcon />
       </IconButton>
       <Typography variant="h5" color="inherit" align="center" gutterBottom>
          About Turboflakes
       </Typography>
       <Typography variant="subtitle2" color="inherit" align="center" paragraph >
       A decision support tool for NPoS networks
       </Typography>
       <Typography variant="subtitle1" color="inherit" paragraph >
        Background
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Turboflakes was born from a research side-project and my interest to always learn a bit more about a topic - this time the topic end up being the <Link href="https://wiki.polkadot.network/docs/en/learn-staking#docsNav" target="_blank" rel="noreferrer" color="inherit" underline="always">Polkadot</Link> network. <br/>
       All these collective dots based on brilliant ideas, put together into practise from Polkadot, the incredible and extensive source of knowledge publicly available about a network protocol ready for the next web, just gives you the boost to do one thing, dive in and learn a bit more :)
       </Typography>
       <Typography variant="subtitle1" color="inherit" paragraph >
        NPoS networks
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Currently Turboflakes is focus around the <Link href="https://wiki.polkadot.network/docs/en/learn-staking#docsNav" target="_blank" rel="noreferrer" color="inherit" underline="always">Staking</Link> system and its Nominated Proof of Stake mechanism. In <Link href="https://wiki.polkadot.network/docs/en/glossary#nominated-proof-of-stake-npos" target="_blank" rel="noreferrer" color="inherit" underline="always">NPoS</Link> networks, nominators back validators with their own stake to help them get into the active validator set, so that validators can proactively secure the network. In return for backing validators, the nominators receive part of the validators rewards. To get the most out of the Staking mechanism and get the best reward returns, implies proactive work and research from the nominator in the network. <br/>In this process nominators face several questions, one of the most important, if not the most important - <Link href="https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-" target="_blank" rel="noreferrer" color="inherit" underline="always">“How do I know which validators to choose?”</Link>
       </Typography>
       <Typography variant="subtitle1" color="inherit" paragraph >
       Multi-Criteria Decision Analysis
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Since the genesis block of the network, there is a steady growing number of new validators waiting to take their chance into the active set. To be a proactive nominator it is a necessity, but also difficult. <br/> Each nominator interests are different and with such a large set of validators around - each with their own set of specific traits and different historical network performance data - to get to know which one is trustworthy to pick for a strict list (up to 16) of nominations, results on a complex decision to make. So, having a tool that helps to support this decision would be of great value for the network.  
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       And that is when Turboflakes with its support decision tool based on Multi-Criteria Decision Analysis - <Link href="https://en.wikipedia.org/wiki/Multiple-criteria_decision_analysis" target="_blank" rel="noreferrer" color="inherit" underline="always">MCDA</Link>, come to rescue. MCDA is a valuable tool that usually leads to a more informed and a better decision-making process.
       </Typography>
       <Typography variant="subtitle1" color="inherit" paragraph >
        Leaderboard
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       To generate the Leaderboard with the highest-ranked Validators on top, there are currently 10 key traits being analysed for each validator:
       <ul>
         <li>Inclusion rate</li>
         <li>Commission</li>
         <li>Number of backing Nominators</li>
         <li>Average reward points</li>
         <li>Is reward payment destination as 'Staked’?</li>
         <li>Is currently elected?</li>
         <li>Own self-stake</li>
         <li>Total Stake</li>
         <li>Identity - number of valid judgements</li>
         <li>Number of sub-accounts or sibling accounts</li>
       </ul>
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Each of these traits are respectively weighted based on the Nominator personal preference. In a scale of 1 to 10 - being 1 the less important and 10 very important - the Nominator can define what their level of importance towards a specific trait is. And at this point each validator gets a score by summing all traits partial scores. Each trait score results from multiplying the respective weight by its corresponding rating value.
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       With all validators scored, the Leaderboard is created, by ordering the highest ranked validator on top.
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       In summary, TURBOFLAKES helps you discover Validators based on their traits and historical performance data, in a way that allows each Nominator to set the level of importance related to a specific trait.
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Hope you find it helpful ✌️
       </Typography>
       <Typography variant="body1" color="inherit" align="justify" paragraph>
       Paulo
       </Typography>
      </Container>
    )
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);

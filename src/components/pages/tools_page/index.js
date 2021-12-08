import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import HeaderLogo from '../header_logo'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class ToolsPage extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    if (this.rootRef.current) {
      this.rootRef.current.scrollIntoView()
    }
  }

  componentDidUpdate() {
    if (this.rootRef.current) {
      this.rootRef.current.scrollIntoView()
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root} ref={this.rootRef}>
        <HeaderLogo />
        <Container className={classes.container}>
          <Typography variant="h2" align="center" className={classes.title}>
          Tools
          </Typography>
          <Typography variant="h4" paragraph>
          NOMI
          </Typography> 
          <Typography paragraph>
          Nomi is a nominator decision support tool for NPoS networks.
          </Typography> 
          <Typography variant="h5" paragraph>
          NPoS networks
          </Typography> 
          <Typography gutterBottom>
          Nomi tool is focused around the <Link href="https://wiki.polkadot.network/docs/en/learn-staking#docsNav" target="_blank" rel="noreferrer" color="inherit" underline="always">Staking</Link> system and its Nominated Proof of Stake mechanism. In <Link href="https://wiki.polkadot.network/docs/en/glossary#nominated-proof-of-stake-npos" target="_blank" rel="noreferrer" color="inherit" underline="always">NPoS</Link> networks, nominators back validators with their own stake to help them get into the active validator set. In this way validators proactively secure the network. In return for backing validators, the nominators receive part of the validators rewards. 
          </Typography> 
          <Typography paragraph>
          To get the most out of the Staking mechanism and the best reward returns, nominators need to gather information on the validators - <Link href="https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-" target="_blank" rel="noreferrer" color="inherit" underline="always">“How do I know which validators to choose?”</Link>
          </Typography> 
          <Typography variant="h5" paragraph>
          Multi-Criteria Decision Analysis
          </Typography> 
          <Typography gutterBottom>
          Since the genesis block there has been a growing number of new validators waiting for their chance to get into the active set - each with its own set of traits and historical network performance data - becoming more challenging for nominators to make an informed decision about which validators to pick. Therefore, having a decision support tool that helps nominators with the selection of validators would be of great value to the network.
          </Typography>
          <Typography paragraph>
          Nomi is a decision support tool based on Multi-Criteria Decision Analysis - <Link href="https://en.wikipedia.org/wiki/Multiple-criteria_decision_analysis" target="_blank" rel="noreferrer" color="inherit" underline="always">MCDA</Link> - that will support nominators to choose which validators to back up by taking into account each validator specific traits and the level of importance assigned to each trait by the nominator.
          </Typography>
          <Typography variant="h5" paragraph >
          Leaderboard
          </Typography>
          <Typography color="inherit" align="justify">
          To generate the Leaderboard with the highest-ranked validators at the top, there are currently 10 key traits being considered for each validator:
          </Typography>
          <ul>
            <li><Typography color="inherit">Inclusion rate</Typography></li>
            <li><Typography color="inherit">Commission</Typography></li>
            <li><Typography color="inherit">Number of backing Nominators</Typography></li>
            <li><Typography color="inherit">Average reward points</Typography></li>
            <li><Typography color="inherit">Is reward payment destination as 'Staked’?</Typography></li>
            <li><Typography color="inherit">Is currently elected?</Typography></li>
            <li><Typography color="inherit">Own self-stake</Typography></li>
            <li><Typography color="inherit">Total Stake</Typography></li>
            <li><Typography color="inherit">Identity - number of valid judgements</Typography></li>
            <li><Typography color="inherit">Number of sub-accounts or sibling accounts</Typography></li>
          </ul>
          <Typography paragraph>
          Each nominator can define the level of importance of each trait in a scale of 1 to 10 - with 1 as the least important and 10 the most important. For each validator the value of each trait is weighted by the level of importance assigned by the nominator.  The overall score for a validator is obtained by summing all the (weighted) values associated with their traits.
          </Typography>
          <Typography color="inherit" align="justify" paragraph>
          After all validators are scored The Leaderboard is created by displaying the highest ranked validators at the top.
          </Typography>
          <Typography color="inherit" align="justify" paragraph>
          In summary, NOMI helps you discover validators based on their traits and historical performance data, in a way that allows each nominator to assign their personal level of importance related to a specific trait.
          </Typography>
          <Typography variant="h4" paragraph>
          CRUNCH
          </Typography> 
          <Typography paragraph>
          Crunch is a command-line interface to easily automate payouts of staking rewards on Substrate-based chains.
          </Typography> 
          <Typography color="inherit" align="justify" paragraph>
          -
          </Typography>
          <Typography color="inherit" align="justify" paragraph>
          Hope you find these tools helpful 🖖
          </Typography>
        </Container>
      </div>
    )
  }
}

ToolsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolsPage);

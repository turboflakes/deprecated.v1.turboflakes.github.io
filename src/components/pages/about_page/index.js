import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import HeaderLogo from '../header_logo'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AboutPage extends Component {

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
          About Us
          </Typography>
          <Typography paragraph>
            <b>TurboFlakes</b> was born out of interest in the <Link href="https://wiki.polkadot.network/docs/en/learn-staking#docsNav" target="_blank" rel="noreferrer" color="inherit" underline="always">Polkadot</Link> network. Our journey began in January 2021 when we decided to deepen our knowledge about this multichain network. At first we were only participating as Nominators, but we soon realised that our expertise could also be applied to set a reliable infrastructure to safely run and secure Validators for the Polkadot and Kusama networks. And so we did it.
          </Typography> 
          <Typography paragraph>
            Being <b>TurboFlakes</b> founder, an active coder himself, we took a step further and started to build tools. Tools designed to improve the experience when interacting with Substrate blockchain networks.
          </Typography>
          <Typography paragraph>
             Tools that could help us, as Validators, to manage our infrastructure and tell us how well our validators perform compared to others in the network. Tools that could help us, as Nominators, select which validators to choose. Tools that would help <b>TurboFlakes</b> to provide a reliable service for the Polkadot community, by proactively monitoring, notifying and rescuing our nodes with the purpose of safeguarding the best interests of our Nominators.
          </Typography>
          <Typography variant="h4" paragraph>
          Team
          </Typography> 
          <Typography paragraph>
            Paulo is a full-stack developer, with more than 16 years of professional experience on building different kinds of applications for several industries, like health and financial institutions under different kinds of technologies. In recent years, has been working mainly for start-up companies, building web and mobile applications to help them start and build their projects off the ground. Paulo’s interest and curiosity in the blockchain space is not new. With some spare time by the beginning of 2021, Polkadot just seemed to be such a cool project to invest time and learn. And so Paulo’s journey into the Polkadot world began.
          </Typography>
          <Typography paragraph>
            Sérgio has a degree in Graphic Design and worked for almost 15 years as an Art Director in the Creative Department of some of the best advertising agencies. He was responsible for the co-creation of numerous advertising campaigns for clients from retail, health, finance, to communications, being some awarded in national and international festivals. Nowadays, Sérgio works as a freelancer in graphic design projects.
          </Typography>
        </Container>
      </div>
    )
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);

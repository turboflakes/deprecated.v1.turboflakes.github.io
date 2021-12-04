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
          TurboFlakes was born out of interest and research about the <Link href="https://wiki.polkadot.network/docs/en/learn-staking#docsNav" target="_blank" rel="noreferrer" color="inherit" underline="always">Polkadot</Link> network on Jan 2021.
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import HeaderLogo from '../header_logo'
import PolkadotValidatorSection from '../index_page/polkadot_validator_section'
import KusamaValidatorSection from '../index_page/kusama_validator_section'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class ValidatorsPage extends Component {

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
          Our Validators
          </Typography>
          <Typography
            align="left"
            paragraph
            >
            <b>TurboFlakes's</b> Polkadot and Kusama validators are independent nodes running on different regions of the world. They run on dedicated and high performance servers with high availability. As a standard practice, we have backup nodes for each validator on the network. Each backup node runs under the same configuration as the other active validator nodes. And to be secure and reliable, our validators setup follows all Polkadot validation <Link href="https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot" 
            target="_blank" rel="noreferrer" color="inherit" 
            className={classes.link}>best practices</Link>.
            </Typography>
            <Typography
            align="left"
            paragraph
            >
            We have been validating on the Kusama network since January 2021 without any issues. And more recently we joined the Polkadot network with our first node. We are also a valid participant in the Kusama's Thousand Validators Programme, a.k.a. 1KV.
            </Typography>
            <Typography
            align="left"
            paragraph
            >
            Below we present you Raiden, Momo and Coco.
            </Typography>
          </Container>
          <PolkadotValidatorSection classNameRoot={classNames(classes.section, classes.polkadot)} />
          <KusamaValidatorSection classNameRoot={classNames(classes.section, classes.kusama)} />
      </div>
    )
  }
}

ValidatorsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidatorsPage);

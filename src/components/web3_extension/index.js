import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../selectors'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3FromSource,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Web3Extension extends Component {

  componentDidMount() {
    const {chain} = this.props
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    web3Enable('turboflakes.io').then(extensions => {
      // console.log("__web3Enable", extensions);
      if (extensions.length === 0) {
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return;
      } 
    });

    web3Accounts().then(allAccounts => {
      // filter accounts specific to the selected network
      let accounts = allAccounts.filter(acc => {
        return acc.meta.genesisHash === chain.genesis_hash || !acc.meta.genesisHash
      });

      // format network specific address
      accounts.forEach(acc => {
        acc.address = encodeAddress(
          decodeAddress(acc.address.toString()),
          chain.ss58_format
        );
      })

      this.setState({accounts})
      
    });
    
  }

 	render() {
		const { classes } = this.props;
    return (
      <div className={classes.root}>
        web 3
      </div>
    )
	}
}

Web3Extension.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    chain: selectors.getApiNetworkDetails(state),
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Web3Extension));
  
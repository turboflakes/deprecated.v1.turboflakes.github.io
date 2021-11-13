import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../selectors'
import { selectAccount } from '../../actions/web3'
import {
	getNetworkWSS, 
	getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../constants'
import {
  web3Accounts,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Web3Extension extends Component {

  state = {
    accounts: []
  }

  componentDidMount() {
    const {isEnabled, chain, network} = this.props
 
    if (isEnabled) {
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

      // Initialise the provider to connect to the local node
      const provider = new WsProvider(getNetworkWSS(network));
      // Create the API and wait until ready
      // const api = await ApiPromise.create({ provider });
      // api.consts.staking.maxNominations
    }

    

  }

  handleChange = (event) => {
    console.log("__event.target.value",event.target.value)
    const { accounts } = this.state;
    const account = accounts.find(acc => acc.address === event.target.value)
    if (account) {
      this.props.selectAccount(account)
    }
  }

 	render() {
		const { classes, chain, isEnabled, selectedAccount } = this.props;
    const { accounts } = this.state;

    // console.log("__accounts", accounts);
    console.log("__selectedAccount",selectedAccount)

    if (!isEnabled) {
      return (
        <div className={classes.root}>
          <Typography
            color="textSecondary"
            align="left"
            paragraph
          >{`It looks like you don't have the Polkadot{.js} extension installed.`}
          </Typography>
          
          <Typography
            variant="body2"
            color="textSecondary"
            align="left"
          >{`Go to `} <Link href="https://polkadot.js.org/extension/" target="_blank" 
            color="textSecondary" underline="always" >polkadot.js.org/extension</Link> {` to install it.`}
          </Typography>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="left"
          gutterBottom
          >{`Select ${chain.name} Account`}
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            variant="outlined"
            value={selectedAccount}
            onChange={this.handleChange}
          >
            {accounts.map(acc => <MenuItem key={acc.address} value={acc.address}>{acc.meta.name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button>Select top {}</Button>
        
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="left"
          paragraph
          >Selected Validators
        </Typography>
      </div>
    )
	}
}

Web3Extension.propTypes = {
	classes: PropTypes.object.isRequired,
  isEnabled: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    network: selectors.getApiNetwork(state),
    selectedAccount: state.web3.address,
    chain: selectors.getApiNetworkDetails(state),
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAccount})(withStyles(styles)(Web3Extension));
  
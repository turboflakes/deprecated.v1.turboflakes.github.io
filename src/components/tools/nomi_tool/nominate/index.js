import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../../../selectors'
import { selectAccount } from '../../../../actions/web3'
import { add as addError } from '../../../../actions/error'
import serialize from '../../../../utils/serialize'
import {nameDisplay, stashDisplay} from '../../../../utils/display'
import {
	getNetworkWSS, 
	getNetworkIndex, 
	getNetworkKey, 
	getNetworkURL 
} from '../../../../constants'
import {
  web3FromSource,
  web3Accounts,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, isHex }  from '@polkadot/util';
import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NominationItem from '../nomination_item'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Nominate extends Component {

  state = {
    accounts: []
  }

  componentDidMount() {
    const {isEnabled, chain } = this.props
 
    if (isEnabled) {
      web3Accounts().then(allAccounts => {
        // filter accounts specific to the selected network
        let accounts = allAccounts.filter(acc => {
          return acc.meta.genesisHash === chain.genesis_hash || !acc.meta.genesisHash
        });
  
        // format network specific address
        accounts.forEach(account => {
          account.address = encodeAddress(
            decodeAddress(account.address.toString()),
            chain.ss58_format
          );
        })

        this.setState({accounts})

        // this.getBondedAccounts(accounts).then(responses => {
        //   const controllers = responses.filter(bonded => bonded.isSome).map(bonded => encodeAddress(decodeAddress(bonded.unwrap()), chain.ss58_format))
        //   const controllerAccounts = accounts.filter(account => !!controllers.find(address => address === account.address.toString()))
        //   this.setState({accounts: controllerAccounts})
        // })

      }); 
    }
  }



  getBondedAccounts = (accounts = []) => {
    const {network} = this.props
    // Initialise the provider to connect to the local node
    const provider = new WsProvider(getNetworkWSS(network));
    // Create the API and wait until ready
    return ApiPromise.create({ provider }).then(api => {
      const calls = accounts.map(acc => {
        return api.query.staking.bonded(acc.address)
      })
      // Retrieve the chain & node information information via rpc calls
      return Promise.all(calls);

    });
  }
  
  handleChange = (event) => {
    const { accounts } = this.state;
    const account = accounts.find(acc => acc.address === event.target.value)
    if (account) {
      this.props.selectAccount(account)
    }
  }

  handleSelectTop = () => {
    this.props.onSelectTop()
  }

  handleNominate = () => {
    const {network, account, nominations} = this.props
    console.log("__account: ", account);
    const provider = new WsProvider(getNetworkWSS(network));
    ApiPromise.create({ provider }).then(api => {
      web3FromSource(account.meta.source).then(injector => {
        api.tx.staking.nominate(nominations).signAndSend(account.address, { signer: injector.signer }, ({status, isError, dispatchError}) => {
          console.log(`Transaction status: ${status.type}`);
          console.log(`dispatchError?.toHuman(): ${dispatchError?.toHuman()}`);
          
          if (status.isInBlock) {
            console.log('Included at block hash', status.asInBlock.toHex());
          } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());
          } else if (isError) {
            console.log('Error', dispatchError);
          }
        }).catch(error => {
          return this.props.addError(`${error}`)
        });
      })
    })
  }

 	render() {
		const { classes, chain, isEnabled, account, 
      maxNominations, nominations } = this.props;

    const { accounts } = this.state;

    const parseName = (account) => {
      if (!!account.address) {
        return `${nameDisplay(account.meta.name, 20)} (${stashDisplay(account.address)})`
      }
      return ``
    }

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
            className={classes.select}
            variant="outlined"
            color="inherit"
            inputProps={{
              classes: {
                root: classes.selectRoot,
                outlined: classes.selectOutlined,
              }
            }}
            value={!!account ? (!!account.address ? account.address : "") : ""}
            onChange={this.handleChange}
          >
            {accounts.map(acc => <MenuItem key={acc.address} value={acc.address}>{parseName(acc)}</MenuItem>)}
          </Select>
        </FormControl>
        <Box className={classes.actionsBox}>
          <Button variant="outlined" color="inherit" onClick={this.handleSelectTop}
            className={classes.button} fullWidth>
            Select top {maxNominations}
          </Button>
          <Button variant="contained" 
            color="primary"
            onClick={this.handleNominate}
            fullWidth
            disabled={!nominations.length || !account.address}>
            Nominate            
          </Button>
        </Box>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="left"
          gutterBottom
          >Validator candidates: {nominations.length}
        </Typography>
        <Box className={classes.listBox}>
          <List className={classes.list}>
            {nominations.map((address, index) => 
              <NominationItem address={address} key={index} expanded={true}/>)}
          </List>
        </Box>
      </div>
    )
	}
}

Nominate.propTypes = {
	classes: PropTypes.object.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  maxNominations: PropTypes.number.isRequired,
  onSelectTop: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    network: selectors.getApiNetwork(state),
    account: state.web3.selectedAccount,
    nominations: state.leaderboard.nominations,
    chain: selectors.getApiNetworkDetails(state),
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAccount, addError})(withStyles(styles)(Nominate));
  
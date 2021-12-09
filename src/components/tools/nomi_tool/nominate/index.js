import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../../../selectors'
import { selectAccount } from '../../../../actions/web3'
import { error, info, success } from '../../../../actions/notification'
import {nameDisplay, stashDisplay} from '../../../../utils/display'
import {
	getNetworkWSS, 
} from '../../../../constants'
import {
  web3Accounts,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseRounded';
import NominationItem from '../nomination_item'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Nominate extends Component {

  state = {
    accounts: []
  }

  componentDidMount() {
    this.getAccounts()
  }

  componentDidUpdate(prevProps) {
    const {chain} = this.props
    // Change network update selected accounts
		if (prevProps.chain.genesis_hash !== chain.genesis_hash) {
			this.getAccounts()
    }
  }

  getAccounts = () => {
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

  handleClose = () => {
    this.props.onClose()
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
            variant="subtitle1"
            color="textSecondary"
            align="left"
            paragraph
          >{`Access to Polkadot{.js}`}
          </Typography>

          <Typography
            // variant="body2"
            color="textSecondary"
            align="left"
            paragraph
          >{`In order to Nominate or your choosen Validators or the highest-ranked ones, this application needs access to the Polkadot{.js} extension in your browser.`}
          </Typography>
          
          <Typography
            // variant="body2"
            color="textSecondary"
            align="left"
            paragraph
          >{`If Polkadot{.js} extension is already installed, just allow turboflakes.io to access it.`}
          </Typography>
          <Typography
            // variant="body2"
            color="textSecondary"
            align="left"
          >{`Otherwise go to `} <Link href="https://polkadot.js.org/extension/" target="_blank" 
            color="textSecondary" underline="always" >polkadot.js.org/extension</Link> {` to install it.`}
          </Typography>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <IconButton aria-label="collapse nomination panel"
					className={classes.iconClose}
					onClick={this.handleClose}>
					<CloseIcon />
				</IconButton>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="left"
          gutterBottom
          >{`Select ${chain.name} controller account`}
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
          <Button variant="outlined" color="inherit" onClick={this.handleSelectTop}
            className={classes.button} 
            // fullWidth
            disabled={!maxNominations}>
            Select top {maxNominations}
          </Button>
        </FormControl>
        {/* <Box className={classes.actionsBox}>
          <Button variant="outlined" color="inherit" onClick={this.handleSelectTop}
            className={classes.button} 
            fullWidth
            disabled={!maxNominations}>
            Select top {maxNominations}
          </Button> */}
          {/* <Button variant="outlined" color="inherit" onClick={this.handleSelectTop}
            className={classes.button} 
            fullWidth
            disabled={!maxNominations}>
            I'm Feeling Lucky
          </Button> */}
          {/* <Button variant="contained" 
            color="primary"
            onClick={this.handleNominate}
            fullWidth
            disabled={!nominations.length || !account.address}>
            Nominate            
          </Button> */}
        {/* </Box> */}
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="left"
          className={classes.candidatesLabel}
          gutterBottom
          >Validator candidates
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
  onSelectTop: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    network: selectors.getApiNetwork(state),
    account: state.web3.selectedAccount,
    nominations: state.leaderboard.nominations,
    featured: selectors.getApiFeatured(state),
    chain: selectors.getApiNetworkDetails(state),
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAccount, error, info, success})(withStyles(styles)(Nominate));
  
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get, getValidatorRank } from '../../actions/validator'
import { clearAddress } from '../../actions/leaderboard'
import { networkDisplay, stashDisplay, nameDisplay, stakeDisplay, commissionDisplay, rateDisplay } from '../../utils/display'
import { NETWORK, networkWSS } from '../../constants'
import { selectors } from '../../selectors'
import serialize from '../../utils/serialize'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import LaunchIcon from '@material-ui/icons/Launch';
import Typography from '@material-ui/core/Typography';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AccountInfo extends Component {

  componentDidMount() {
    const {address} = this.props
    if (address) {
      this.props.get(address)
    }
  }

  componentDidUpdate(prevProps) {
    const {address, rank, weights, isFetching, account} = this.props
    if (!isFetching && (prevProps.weights !== weights || rank === 0)) {
      this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
    }
    if (!isFetching && prevProps.address !== address && !account.id) {
      this.props.get(address)
    }
  }
	
	handleClear = () => {
    this.props.clearAddress()
  }

  handleClickExternalGraph = (stash) => {
    const uri = encodeURI(`https://polkadot.js.org/apps/?rpc=${networkWSS[NETWORK]}#/staking/query/${stash}`)
    window.open(uri, '_blank')
  }

 	render() {
		const { classes, account } = this.props;

    if (!account.id) {
      return null
    }

    const stash = networkDisplay(account.id)
		
		return (
      <div className={classes.root}>
        <Box className={classes.header}>
          <IconButton aria-label="back" color="primary" className={classes.backIcon} onClick={this.handleClear}>
            <ClearIcon />
          </IconButton>
          <Identicon
            value={stash}
            size={64}
            theme={'polkadot'} />
          <Typography variant="h5" color="textPrimary" >
					  {stashDisplay(stash)}
					</Typography>
          <Typography variant="subtitle1" color="textPrimary" >
            {!!account.name ? nameDisplay(account.name) : '-'}
          </Typography>
        </Box>
        <List dense>
          <ListItem>
            <ListItemText primary="Rank" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={!!account.rank ? account.rank : '-'} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Controller" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText
              primary={stashDisplay(networkDisplay(account.controller))}
              classes={{
                secondary: classes.secondaryItemText
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Inclusion Rate" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={rateDisplay(account.inclusion_rate)} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Commission" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={commissionDisplay(account.commission)} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Own Stake" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={stakeDisplay(account.own_stake)} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Others Stake" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={stakeDisplay(account.nominators_stake)} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nominators" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={account.nominators} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Average Reward Points" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={account.avg_reward_points} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Reward Staked" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={!!account.reward_staked ? 'true' : 'false'} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Judgements" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={account.judgements} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sub or Sibling Accounts" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={account.sub_accounts} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Active" 
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText }} />
            <ListItemText primary={!!account.active ? 'true' : 'false'} classes={{ secondary: classes.secondaryItemText }} />
          </ListItem>
        </List>
        <Box className={classes.footer}>
          <IconButton aria-label="back" className={classes.graphIcon} onClick={() => this.handleClickExternalGraph(stash)}>
            <LaunchIcon />
          </IconButton>
        </Box>
      </div>
    )
	}
}

AccountInfo.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const address = state.leaderboard.selected
  const account = selectors.getObjectByEntityAndId(state, 'validator', address)
  const weights = state.leaderboard.weights
  const quantity = state.leaderboard.quantity
  const query = serialize({q: "Board", w: weights, n: quantity})
  const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
  // Rank is defined by the index of the address in the list of addresses of the respective
  // leaderboard. 
  // If the current address is not available in the leaderboard, a fetch is triggered 
  // to request the rank from the backend
  const localIndex = addresses.indexOf(state.leaderboard.selected)
  const rank = localIndex !== -1 ? addresses.indexOf(state.leaderboard.selected) + 1 : account.rank
  return {
    address,
    rank,
    weights,
		account: {
      ...account,
      rank
    },
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { get, getValidatorRank, clearAddress })(withStyles(styles)(AccountInfo));
  
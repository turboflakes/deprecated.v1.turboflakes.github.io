import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get, getValidatorRank } from '../../actions/validator'
import { clearAddress } from '../../actions/leaderboard'
import { networkDisplay, stashDisplay, nameDisplay, stakeDisplay, commissionDisplay, rateDisplay } from '../../utils/display'
import { NETWORK, networkWSS } from '../../constants'
import { selectors } from '../../selectors'
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { ReactComponent as PolkadotJsSVG } from '../../assets/polkadot_js_logo.svg';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const displayScore = scores => {
  if (!!scores) {
    let score = scores.reduce((acc, x) => acc + x, 0)
    return Math.round(score * 100) / 100
  }
  return '-'
}

const displayMaxScore = weights => {
  if (!!weights) {
    return weights.split(",").map(x => parseInt(x, 10)).reduce((acc, x) => acc + x, 0)
  }
  return '-'
}

const round4 = (value) => {
  return Math.round(value * 10000) / 10000
}

class AccountInfo extends Component {

  componentDidMount() {
    const {address, weights} = this.props
    if (!!address) {
      this.props.get(address)
      if (!!weights) {
        this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {address, weights, isFetching, account} = this.props
    if (!isFetching && prevProps.address !== address && !account.id) {
      this.props.get(address)
    }
    if (!isFetching && (prevProps.weights !== weights || prevProps.address !== address)) {
      this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
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
		const { classes, account, weights, isFetching } = this.props;

    if (isFetching || !account.id || !account.scores || !account.rank || !account.limits) {
      return (
        <div className={classes.fetching}>
          <Fade in={isFetching} 
            style={{
                transitionDelay: !isFetching ? '10ms' : '0ms',
              }}
              unmountOnExit
            >
            <CircularProgress size={24} />
          </Fade>
        </div>
    )}

    const stash = networkDisplay(account.id)

    const weightsFn = (index) => weights.split(",").map(x => parseInt(x, 10))[index]

    const scoreFn = (index) => round4(account.scores[index])
    
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
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Rank:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${account.rank}`}
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`total score: ${displayScore(account.scores)} / ${displayMaxScore(weights)}`}
                  </Typography>
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Inclusion rate:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${rateDisplay(account.inclusion_rate)}`}
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(0)} / ${weightsFn(0)}`}
                  </Typography>
                  {`min: 0 max: 100`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Commission: 
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${commissionDisplay(account.commission)}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(1)} / ${weightsFn(1)}`}
                  </Typography>
                  {`min: 0 max: 100`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Nominators: 
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${account.nominators}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(2)} / ${weightsFn(2)}`}
                  </Typography>
                  {`min: 0 max: 256`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Average reward points:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${Math.round(account.avg_reward_points * 100)/100}`}
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(3)} / ${weightsFn(3)}`}
                  </Typography>
                  {`avg min: ${round4(account.limits.min_avg_points_limit)} avg max: ${round4(account.limits.max_avg_points_limit)}`}
                </React.Fragment>}
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Reward destination as 'Staked':
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${!!account.reward_staked ? 'yes' : 'no'}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(4)} / ${weightsFn(4)}`}
                  </Typography>
                  {`min: 0 max: 1`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Currently Elected:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${!!account.active ? 'yes' : 'no'}`}
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(5)} / ${weightsFn(5)}`}
                  </Typography>
                  {`min: 0 max: 1`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Own self-stake:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${stakeDisplay(account.own_stake)}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(6)} / ${weightsFn(6)}`}
                  </Typography>
                  {`min: ${stakeDisplay(account.limits.min_own_stake_limit)} max: ${stakeDisplay(account.limits.max_own_stake_limit)}`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Total stake:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${stakeDisplay(account.own_stake + account.nominators_stake)}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(7)} / ${weightsFn(7)}`}
                  </Typography>
                  {`min: ${stakeDisplay(account.limits.min_total_stake_limit)} max: ${stakeDisplay(account.limits.max_total_stake_limit)}`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Identity judgements:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${account.judgements}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(8)} / ${weightsFn(8)}`}
                  </Typography>
                  {`min: ${Math.abs(round4(account.limits.min_judgements_limit))} max: ${round4(account.limits.max_judgements_limit)}`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText 
              primary={
                <React.Fragment>
                  Sub-accounts:
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${account.sub_accounts}`}
                  </Typography>
                </React.Fragment>} 
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.block}
                    color="textPrimary"
                  >
                    {`score: ${scoreFn(9)} / ${weightsFn(9)}`}
                  </Typography>
                  {`min: ${Math.abs(round4(account.limits.min_sub_accounts_limit))} max: ${round4(account.limits.max_sub_accounts_limit)}`}
                </React.Fragment>
              }
              classes={{ root: classes.rootItemText, primary: classes.primaryItemText, secondary: classes.secondaryItemText }} />
          </ListItem>
        </List>
        <Divider light classes={{ light: classes.light }}/>
        <Box className={classes.footer}>
          <IconButton aria-label="polkadot{.js}" className={classes.graphIcon} 
            onClick={() => this.handleClickExternalGraph(stash)}>
            <PolkadotJsSVG className={classes.polkadotJsLogo} />
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
  return {
    address,
    weights,
    account,
    isFetching: !!state.fetchers.ids[`/validator/${address}`] || !!state.fetchers.ids[`/validator/${address}/rank`] || account.status === "NotReady",
  }
}

export default connect(mapStateToProps, { get, getValidatorRank, clearAddress })(withStyles(styles)(AccountInfo));
  
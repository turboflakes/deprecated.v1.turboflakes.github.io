import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get, getValidatorRank } from '../../../../actions/validator'
import { addAddress, removeAddress } from '../../../../actions/leaderboard'
import { stashDisplay, nameDisplay, stakeDisplayNoSymbol, commissionDisplay, rateDisplay } from '../../../../utils/display'
import {getNetworkWSS } from '../../../../constants'
import { selectors } from '../../../../selectors'
import { 
	parseIntervalsIntoArray,
	parseRateIntervalToPercentage, 
	parseCommissionIntervalToPercentage, 
  parsePointsInterval,
  parseTokenInPlanckIntervalToUnit
} from '../../../../utils/math'
import { encodeAddress } from '@polkadot/util-crypto'
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { ReactComponent as PolkadotJsSVG } from '../../../../assets/polkadot_js_logo.svg';
import { ReactComponent as SubscanSVG } from '../../../../assets/subscan_logo.svg';
import Identicon from '@polkadot/react-identicon';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
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

const round2 = (value) => {
  return Math.round(value * 100) / 100
}

const addRow = (name, value, interval, score) => {
  return { name, value, interval, score };
}

class AccountInfoTable extends Component {

  componentDidMount() {
    const {address, weights, intervals} = this.props
    if (!!address) {
      this.props.get(address)
      if (!!weights && !!intervals) {
        this.props.getValidatorRank(address, {q: "Board", w: weights, i: intervals}, {expire: 0})
      } else if (!!weights) {
        this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {address, weights, intervals, isFetching, account} = this.props
    if (!isFetching && !!address && prevProps.address !== address && !account.id) {
      this.props.get(address)
    }
    if (!isFetching && !!address && (prevProps.weights !== weights || prevProps.intervals !== intervals || prevProps.address !== address)) {
      if (!!weights && !!intervals) {
        this.props.getValidatorRank(address, {q: "Board", w: weights, i: intervals}, {expire: 0})
      } else if (!!weights) {
        this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
      }
    }
  }
	
	handleClose = () => {
    this.props.onClose()
  }

  handleClickPolkadotJsExternal = (stash) => {
    const {network} = this.props
    const uri = encodeURI(`https://polkadot.js.org/apps/?rpc=${getNetworkWSS(network)}#/staking/query/${stash}`)
    window.open(uri, '_blank')
  }

  handleClickSubscanExternal = (stash) => {
    const {network} = this.props
    const uri = encodeURI(`https://${network}.subscan.io/validator/${stash}`)
    window.open(uri, '_blank')
  }

  handleCandidate = () => {
    const {address, isCandidate} = this.props
    if (isCandidate) {
      return this.props.removeAddress(address)
    }
    this.props.addAddress(address)
  }

 	render() {
		const { classes, width, rows, account, weights, networkDetails, isFetching, 
      isCandidate, canBeAdded, isFeatured } = this.props;
    
    if (isFetching) {
      return (
        <div className={classes.root}>
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

    if (!account.id || !account.scores || !account.rank) {
      return null
    }

    const stash = encodeAddress(account.id, networkDetails.ss58_format)

    return (
      <div className={classes.root}>
        <Box className={classes.headerBox}>
          <Typography
              variant={isWidthUp('xl', width) ? "h1": "h2"}
              className={classes.rank}
              color="textPrimary"
            >
              {` ${account.rank}`}
            </Typography>
          <Identicon
            value={stash}
            size={isWidthUp('xl', width) ? 64 : 48}
            theme={'polkadot'} />
          <Typography variant={"h6"} >
            {stashDisplay(stash)}
          </Typography>
          <Typography variant="subtitle2">
            {!!account.name ? nameDisplay(account.name, 30) : "-"}
          </Typography>
        </Box>

        <Box className={classes.tableBox}>
          <IconButton aria-label="Close" color="default"
            className={classes.closeButton}
            onClick={this.handleClose}>
            <ClearIcon />
          </IconButton>
          {!isFeatured ?
            <Button variant="contained" color={isCandidate ? "secondary" : "primary" }
              disabled={!isCandidate && !canBeAdded}
              onClick={this.handleCandidate} className={classes.selectButton}>
              {isCandidate ? `Remove candidate` : `Add candidate`}
            </Button> : null}
          <TableContainer component={Paper} elevation={0} 
            classes={{root: classes.tableContainerRoot}}>
            <Table size="small" className={classes.table} >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Interval</TableCell>
                  <TableCell align="right">Score / Weight</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    className={classes.tableRow}
                  >
                    <TableCell component="th" scope="row" style={{whiteSpace: "nowrap"}}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.interval}</TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className={classes.tableRow}>
                  <TableCell classes={{footer: classes.cellFooter}}>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right" classes={{footer: classes.cellFooter}}>{`${displayScore(account.scores)} / ${displayMaxScore(weights)}`}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        <Box className={classes.footerBox}>
          <IconButton aria-label="Polkadot{.js}" className={classes.iconBtn} 
            onClick={() => this.handleClickPolkadotJsExternal(stash)}>
            <PolkadotJsSVG className={classes.iconLogo} />
          </IconButton>
          <IconButton aria-label="Subscan" className={classes.iconBtn} 
            onClick={() => this.handleClickSubscanExternal(stash)}>
            <SubscanSVG className={classes.iconLogo} />
          </IconButton>
        </Box>
      </div>
    )
	}
}

AccountInfoTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const network = selectors.getApiNetwork(state)
  const networkDetails = selectors.getApiNetworkDetails(state)
  const address = state.leaderboard.selected
  const account = selectors.getObjectByEntityAndId(state, 'validator', address)
  const weights = state.leaderboard.weights
  const intervals = state.leaderboard.intervals
  const _intervals = parseIntervalsIntoArray(intervals)
  const weightsFn = (i) => weights.split(",").map(x => parseInt(x, 10))[i]

  const scoreFn = (i) => round2(account.scores[i])

  const createTableData = () => {
    if (!network || !account.id || !account.scores || !account.rank || !intervals) {
      return []
    }
    return [
      addRow('Inclusion rate', rateDisplay(account.inclusion_rate), `[${parseRateIntervalToPercentage(_intervals[0])}] %`, `${scoreFn(0)} / ${weightsFn(0)}`),
      addRow('Commission', commissionDisplay(account.commission), `[${parseCommissionIntervalToPercentage(_intervals[1])}] %`, `${scoreFn(1)} / ${weightsFn(1)}`),
      addRow('Nominators', account.nominators, `[${_intervals[2]}]`, `${scoreFn(2)} / ${weightsFn(2)}`),
      addRow('Average points', Math.round(account.avg_reward_points), `[${parsePointsInterval(_intervals[3])}]`, `${scoreFn(3)} / ${weightsFn(3)}`),
      addRow('Stake rewards', !!account.reward_staked ? 'yes' : 'no', `[${_intervals[4]}]`, `${scoreFn(4)} / ${weightsFn(4)}`),
      addRow("Active", !!account.active ? 'yes' : 'no', `[${_intervals[5]}]`, `${scoreFn(5)} / ${weightsFn(5)}`),
      addRow(`Own self-stake (${networkDetails.token_symbol})`, stakeDisplayNoSymbol(account.own_stake, networkDetails), `[${parseTokenInPlanckIntervalToUnit(_intervals[6], networkDetails)}]`, `${scoreFn(6)} / ${weightsFn(6)}`),
      addRow(`Total stake (${networkDetails.token_symbol})`, stakeDisplayNoSymbol(account.own_stake + account.nominators_stake, networkDetails), `[${parseTokenInPlanckIntervalToUnit(_intervals[7], networkDetails)}]`, `${scoreFn(7)} / ${weightsFn(7)}`),
      addRow("Identity", account.judgements, `[${_intervals[8]}]`, `${scoreFn(8)} / ${weightsFn(8)}`),
      addRow("Sub-accounts", account.sub_accounts, `[${_intervals[9]}]`, `${scoreFn(9)} / ${weightsFn(9)}`),
      // addRow("Total", "", "", `${displayScore(account.scores)} / ${displayMaxScore(weights)}`),
    ];
  }
  
  const rows = createTableData()
  
  return {
    address,
    weights,
    intervals,
    account,
    rows,
    network,
    networkDetails,
    isCandidate: !!state.leaderboard.nominations.find(a => a === address),
    canBeAdded: state.web3.maxNominations > state.leaderboard.nominations.length,
    isFeatured: !!selectors.getApiFeatured(state).find(s => s === address),
    isFetching: !!state.fetchers.ids[`/validator/${address}`] || !!state.fetchers.ids[`/validator/${address}/rank`] || account.status === "NotReady" || account.status === "NotFound",
  }
}

export default connect(mapStateToProps, { get, getValidatorRank, addAddress, removeAddress })(withWidth()(withStyles(styles)(AccountInfoTable)));
  
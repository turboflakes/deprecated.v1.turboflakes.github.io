import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectors } from '../../../selectors'
import serialize from '../../../utils/serialize'
import { selectAddress, clearAddress } from '../../../actions/leaderboard'
import { isValidAddress, addressSS58 } from '../../../utils/crypto'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchRounded';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForward from '@material-ui/icons/ArrowForward';
import BoardAnimation from '../../board_animation'
import Leaderboard from '../../leaderboard'
import AccountInfoTable from '../../account_info_table'
import logo from '../../../assets/logo/logo_1_color_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles'

class NewIndexPage extends Component {

  state = {
    address: ""
  }

  handleChange = event => {
    this.setState({ address: event.target.value });
  }

  changeParams = (query, value) => {
		const {history} = this.props
		query.set("a", value)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

  handleSubmit = (e) => {
    e.preventDefault()
    const {address} = this.state
    if (isValidAddress(address)) {
      const {location} = this.props
		  let query = new URLSearchParams(location.search)
		  this.changeParams(query, address)
      this.props.selectAddress(addressSS58(address))
    }
  }

  handleOnBallClick = (address) => {
    if (!!address) {
      this.props.selectAddress(address)
    }
  }

  handleOnBallClear = () => {
    this.props.clearAddress()
  }

  render() {
    const { classes, addresses, selected, isFetching } = this.props;
    
    return (
      <Box className={classes.root}>
        <Box className={classes.heroBox}>
          <Box>
            <Box align="center">
              <img src={logo} className={classes.logo} alt={"logo"}/>
            </Box>
            <Typography
              variant="h2"
              className={classes.inline}
              color="textPrimary"
              align="center"
            >
              HELPS YOU TO<br/>
              DISCOVER VALIDATORS
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.inline}
              color="textPrimary"
              align="center"
            >
              Earn Rewards on Digital Assets
            </Typography>
          </Box>
          <Box className={classes.searchBox}>
            <form className={classes.form} noValidate autoComplete="off"
              onSubmit={this.handleSubmit}>
              <SearchIcon color="primary" fontSize="large" className={classes.searchIcon}/>
              <TextField
                variant="outlined"
                fullWidth
                autoFocus
                placeholder="Search for a Validator address in the current Leaderboard"
                disabled={isFetching}
                value={this.state.address}
                onChange={this.handleChange}
                error={!isValidAddress(this.state.address)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleSubmit} 
                        color="primary" 
                        disabled={isFetching || !isValidAddress(this.state.address)}>
                        <ArrowForward />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
            />
            </form>
          </Box>
        </Box>
        <Box className={classes.animationBox}>
          <BoardAnimation 
              addresses={addresses}
              selected={selected}
              width={window.innerWidth} 
              height={window.innerHeight * 0.9}
              onBallClick={this.handleOnBallClick}
              onBallClear={this.handleOnBallClear} />
          <AccountInfoTable />
        </Box>
        <Leaderboard />
      </Box>
    )
  }
}

NewIndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const weights = state.leaderboard.weights
  const quantity = state.leaderboard.quantity
  const selected = state.leaderboard.selected
  const query = serialize({q: "Board", w: weights, n: quantity})
  const addresses = selectors.getIdsByEntityAndQuery(state, 'validator', query, 'addresses')
  return {
    quantity,
    selected,
    addresses,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAddress, clearAddress})(withWidth()(withStyles(styles)(NewIndexPage)));

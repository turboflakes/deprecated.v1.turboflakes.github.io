import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { selectAddress, clearAddress } from '../../../../actions/leaderboard'
import { isValidAddress, addressSS58 } from '../../../../utils/crypto'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchRounded';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class SearchSmall extends Component {

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

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root}>
        <form className={classes.searchForm} noValidate autoComplete="off"
          onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Search by validator address"
            color="primary"
            className={classes.textfield}
            value={this.state.address}
            onChange={this.handleChange}
            size="small"
            fullWidth
            // error={!isValidAddress(this.state.address)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={this.handleSubmit} size="small"
                    color="primary" 
                    disabled={!isValidAddress(this.state.address)}>
                    <SearchIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
              classes: {
                root: classes.inputTextfield,
                adornedEnd: classes.adornedEndTextfield,
                adornedStart: classes.adornedStartTextfield
              }
            }}
        />
        </form>
      </Box>
    )
  }
}

SearchSmall.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    isFetching: !!state.fetchers.async,
})

export default connect(mapStateToProps, {selectAddress, clearAddress})(withRouter(withStyles(styles)(SearchSmall)));

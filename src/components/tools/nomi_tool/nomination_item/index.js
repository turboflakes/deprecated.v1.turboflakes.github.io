import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { selectAddress, removeAddress } from '../../../../actions/leaderboard'
import { stashDisplay, nameDisplay } from '../../../../utils/display'
import { selectors } from '../../../../selectors'
import { encodeAddress } from '@polkadot/util-crypto'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/HighlightOffRounded';
import Fade from '@material-ui/core/Fade';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class NominationItem extends Component {

  handleSelectOnClick = (address) => {
    const {location} = this.props
		let query = new URLSearchParams(location.search)
		this.changeParams(query, address)
    this.props.selectAddress(address)
  }

  changeParams = (query, value) => {
		const {history} = this.props
		query.set("a", value)
		const location = {
			search: `?${query.toString()}`
		}
		history.replace(location)
	}

  handleRemoveOnClick = (address) => {
    this.props.removeAddress(address)
  }
  
 	render() {
		const { classes, address, account, selected, networkDetails, isFetching } = this.props;
    const stash = encodeAddress(address, networkDetails.ss58_format)
		const isSelected = account.id === selected
    const name = !!account.name ? `${nameDisplay(account.name, 30)}` : `${stashDisplay(stash)}`
		return (
      <ListItem className={classes.root} disableGutters 
        classes={{
          root: classes.rootItem,
          selected: classes.selectedItem
        }} selected={isSelected} >
				<ListItemAvatar>
          {isFetching ? 
            <Fade in={isFetching} 
                style={{
                    transitionDelay: !isFetching ? '10ms' : '0ms',
                  }}
                  unmountOnExit
                >
              <CircularProgress size={24} className={classes.progress} />
            </Fade>
             :
              <Identicon
                value={stash}
                size={24}
                theme={'polkadot'} />
              }
        </ListItemAvatar>
        <ListItemText primary={isFetching ? `` : name }
          onClick={() => this.handleSelectOnClick(address)} 
          align="left" classes={{primary: classes.itemText}} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete"
              onClick={() => this.handleRemoveOnClick(address)} >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction> 
      </ListItem>
    )
	}
}

NominationItem.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const networkDetails = selectors.getApiNetworkDetails(state)
  const account = selectors.getObjectByEntityAndId(state, 'validator', ownProps.address)
  return {
    networkDetails,
    account,
    selected: state.leaderboard.selected,
    isFeatured: !!selectors.getApiFeatured(state).find(s => s === ownProps.address),
    isFetching: !!state.fetchers.ids[`/validator/${ownProps.address}`],
  }
}

export default connect(mapStateToProps, { selectAddress, removeAddress })(withRouter(withStyles(styles)(NominationItem)));
  
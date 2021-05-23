import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get } from '../../actions/validator'
import { selectAddress } from '../../actions/leaderboard'
import { networkDisplay, stashDisplay, nameDisplay } from '../../utils/display'
import { selectors } from '../../selectors'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AccountItem extends Component {
	
	componentDidMount(){
		const {address} = this.props
		if (address) {
			this.props.get(address)
		}
  }

  handleOnClick = (address) => {
    this.props.selectAddress(address)
  }

 	render() {
		const { classes, address, account, selected, isFetching } = this.props;
    const stash = networkDisplay(address)
		const isSelected = account.id === selected

		return (
      <ListItem classeName={classes.root} button onClick={() => this.handleOnClick(address)} 
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
              <CircularProgress size={24} />
            </Fade> :
            <Identicon
              value={stash}
              size={32}
              theme={'polkadot'} />}
        </ListItemAvatar>
        <ListItemText primary={isFetching ? `` : (!!account.name ? nameDisplay(account.name) : stashDisplay(stash))}
          classes={isSelected ? {primary: classes.selectedItemText} : null} />
      </ListItem>
    )
	}
}

AccountItem.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const account = selectors.getObjectByEntityAndId(state, 'validator', ownProps.address)
  const selected = state.leaderboard.selected
  return {
		account,
    selected,
    isFetching: !!state.fetchers.ids[`/validator/${ownProps.address}`],
  }
}

export default connect(mapStateToProps, { get, selectAddress })(withStyles(styles)(AccountItem));
  
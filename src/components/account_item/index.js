import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get } from '../../actions/validator'
import { selectAccount } from '../../actions/leaderboard'
import { networkDisplay, stashDisplay, nameDisplay } from '../../utils/display'
import { selectors } from '../../selectors'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class AccountItem extends Component {
	
	state = {
    selectedIndex: -1,
  }

	componentDidMount(){
		const {id, queryParams} = this.props
		if (id) {
			this.props.get(id, queryParams)
		}
  }

  handleOnClick = (id) => {
    this.props.selectAccount(id)
  }

 	render() {
		const { classes, id, account, selected } = this.props;

    const stash = networkDisplay(id)
		const isSelected = account.id === selected
		return (
      <ListItem button onClick={() => this.handleOnClick(id)} 
        classes={{
          root: classes.rootItem,
          selected: classes.selectedItem
        }}>
				<ListItemAvatar>
				<Identicon
          value={stash}
          size={32}
          theme={'polkadot'} />
        </ListItemAvatar>
        <ListItemText primary={!!account.name ? nameDisplay(account.name) : stashDisplay(stash)} 
          classes={isSelected ? { primary: classes.primaryItemText } : null}/>
      </ListItem>
    )
	}
}

AccountItem.propTypes = {
	classes: PropTypes.object.isRequired,
  queryParams: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const account = selectors.getObjectByEntityAndId(state, 'validator', ownProps.id)
  const selected = state.leaderboard.selected
  return {
		account,
    selected,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { get, selectAccount })(withStyles(styles)(AccountItem));
  
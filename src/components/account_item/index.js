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
		const {id} = this.props
		if (id) {
			this.props.get(id)
		}
  }

  handleOnClick = (id) => {
    this.props.selectAccount(id)
  }

 	render() {
		const { id, account } = this.props;

    const stash = networkDisplay(id)
		
		return (
      <ListItem button onClick={() => this.handleOnClick(id)}>
				<ListItemAvatar>
				<Identicon
          value={stash}
          size={32}
          theme={'polkadot'} />
        </ListItemAvatar>
        <ListItemText primary={!!account.name ? nameDisplay(account.name) : stashDisplay(stash)} />
      </ListItem>
    )
	}
}

AccountItem.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const account = selectors.getObjectByEntityAndId(state, 'validator', ownProps.id)
  return {
		account,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { get, selectAccount })(withStyles(styles)(AccountItem));
  
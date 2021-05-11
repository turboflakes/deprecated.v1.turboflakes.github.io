import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get } from '../../actions/validator'
import { selectors } from '../../selectors'
import { encodeAddress } from '@polkadot/util-crypto'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const NETWORK = !!process.env.REACT_APP_NETWORK ? process.env.REACT_APP_NETWORK : 'westend'

const network_prefixes = {
  'polkadot': 0,
  'kusama': 2
}

const stashDisplay = (stash) => {
  return `${stash.slice(0, 6)}...${stash.slice(stash.length-6, stash.length)}`
}

const nameDisplay = (name) => {
	return name.length > 24 ? `${name.slice(0, 24)}...` : name
}

const networkDisplay = (stash) => {
  if (NETWORK in network_prefixes) {
    return encodeAddress(stash, network_prefixes[NETWORK])
  }
  return stash
}

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

 	render() {
		const { classes, id, account } = this.props;

    const stash = networkDisplay(id)
		
		return (
      <ListItem key={stash}
            classes={{
              root: classes.listItemRoot,
            }}
			>
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

export default connect(mapStateToProps, { get })(withStyles(styles)(AccountItem));
  
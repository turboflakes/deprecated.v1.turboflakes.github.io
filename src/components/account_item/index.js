import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get } from '../../actions/validator'
import { selectors } from '../../selectors'
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Identicon from '@polkadot/react-identicon';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const stashDisplay = (stash) => {
	return `${stash.slice(0, 6)}...${stash.slice(stash.length-6, stash.length)}`
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
		
		return (
      <ListItem key={id}
            classes={{
              root: classes.listItemRoot,
            }}
			>
				<ListItemAvatar>
				<Identicon
          value={id}
          size={50}
          theme={'polkadot'} />
        </ListItemAvatar>
        <ListItemText primary={!!account.name ? account.name : stashDisplay(id)} />
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
  
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectAddress } from '../../actions/leaderboard'
import { selectors } from '../../selectors'
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto'
import { hexToU8a, isHex } from '@polkadot/util';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

const isValidAddress = (address) => {
  try {
    encodeAddress(
      isHex(address) ?
      hexToU8a(address) :
      decodeAddress(address)
    );
    return true;
  } catch (error) {
    return false;
  }
}

class AccountSearchDialog extends Component {

  state = {
    address: ""
  }

  handleClose = () => {
    this.setState({ address: "" });
    this.props.onClose();
  };

  handleChange = event => {
    this.setState({ address: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const {address} = this.state
    if (isValidAddress(address)) {
      // convert address to the network selected
      // address
      console.log("__", address);
      this.props.selectAddress(address)
      this.handleClose()
      // const {address, rank, weights, isFetching} = this.props
      // if (!isFetching && (prevProps.weights !== weights || rank === 0)) {
      //   this.props.getValidatorRank(address, {q: "Board", w: weights}, {expire: 0})
      // }
      // this.props.get(address)
    }
  };

  render() {
    const { classes, isFetching, open } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          classes={{
            paperFullScreen: classes.paperFullScreen
          }}
          >
          <DialogContent classes={{ root: classes.contentRoot }}>
            <Container >
              <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
              <form className={classes.form} noValidate autoComplete="off"
                onSubmit={this.handleSubmit}>
                <Typography variant="h6" color="textSecondary" align="left" gutterBottom>
                Search for a Validator address in the current Leaderboard
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  autoFocus
                  value={this.state.address}
                  onChange={this.handleChange}
                  error={!isValidAddress(this.state.address) && !!this.state.address}
                  InputProps={{
                    endAdornment: (
                      isFetching ? <Fade
                          in={isFetching}
                          style={{
                            transitionDelay: !isFetching ? '10ms' : '0ms',
                          }}
                          unmountOnExit
                        >
                          <CircularProgress size={24} />
                        </Fade> : null
                    ),
                  }}
              />
              </form>
            </Container>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AccountSearchDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const account = selectors.getObjectByEntityAndId(state, 'validator', ownProps.id)
  return {
    account,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, {selectAddress})(withWidth()(withStyles(styles)(AccountSearchDialog)));
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { get } from '../../../actions/validator'
import { selectors } from '../../../selectors'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const stash = "5FsFiesijmmtB47QTxnr7Ps1n4s4MuGbsosGaGpyWJcL9aSt"

class ContainerPage extends Component {

  componentDidMount(){
    this.props.get(stash)
  }

  render() {
    const { classes, isFetching } = this.props;
    return (
      <div className={classes.root}>
        {isFetching ? "fetching.." : null}
        {/* <Header /> */}
        {this.props.children}
        {/* <Footer /> */}
        {/* <Alert /> */}
      </div>
    )
  }
}

ContainerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const validator = selectors.getObjectByEntityAndId(state, 'validator', stash)
  return {
    validator,
    isFetching: !!state.fetchers.async,
  }
}

export default connect(mapStateToProps, { get })(withStyles(styles)(ContainerPage));

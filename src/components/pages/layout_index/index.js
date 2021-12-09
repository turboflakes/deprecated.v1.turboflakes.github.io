import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getApiDetails } from '../../../actions/api'
import Header from '../../header'
import Alert from '../../alert'
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutIndex extends Component {

  componentDidMount() {
    const {network} = this.props
    if (!!network) {
      this.props.getApiDetails(network)
    }
  }

  componentDidUpdate(prevProps) {
    const {network} = this.props
    if (!!network && prevProps.network !== this.props.network) {
      this.props.getApiDetails(network)
    }
  }
  
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Header />
        <Alert />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

LayoutIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const network = ownProps.match ? (ownProps.match.params ? ownProps.match.params.network : undefined) : undefined
  return {
    network
  }
}

export default connect(mapStateToProps, {getApiDetails})(withStyles(styles)(LayoutIndex));

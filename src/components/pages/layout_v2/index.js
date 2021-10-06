import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { info } from '../../../actions/api'
import Header from '../../header'
import Alert from '../../alert'
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Layout extends Component {

  componentDidMount() {
    this.props.info()
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

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({})

export default connect(mapStateToProps, {info})(withStyles(styles)(Layout));

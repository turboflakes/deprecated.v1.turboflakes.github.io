import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutDefault extends Component {
  
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

LayoutDefault.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LayoutDefault);

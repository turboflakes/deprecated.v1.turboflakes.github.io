import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackRounded';
import Footer from '../../footer'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class LayoutDefault extends Component {
  
  handleBack = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <div className={classes.closeButtonBox}>
          <IconButton aria-label="Back" classes={{ root: classes.closeButtonRoot }}  
            onClick={this.handleBack}>
            <ArrowBackIcon classes={{ root: classes.closeButtonIconRoot }} />
          </IconButton>
        </div>
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

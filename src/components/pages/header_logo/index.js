import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import logo from '../../../assets/logo/logo_1_black_subtract_turboflakes_.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class HeaderLogo extends Component {
  
  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root}>
        <Link href="/" >
          <img src={logo} className={classes.logo} alt={"logo"}/>
        </Link>
      </Box>
    )
  }
}

HeaderLogo.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(HeaderLogo);

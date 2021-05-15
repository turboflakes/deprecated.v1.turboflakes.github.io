import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NETWORK} from '../../constants'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ReactComponent as TurboflakesSVG } from '../../assets/turboflakes_default.svg';
import { ReactComponent as KusamaSVG } from '../../assets/kusama_icon.svg';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class Header extends Component {

  state = {
    network: 2
  }

  handleChange = () => {
    // TODO
  }

  render() {
    const { classes} = this.props;
		
		return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <Toolbar variant="dense" className={classes.toolBar}>
            <Box className={classes.logo}>
              <TurboflakesSVG />
              <Typography variant="h5" className={classes.moto}>
              Discover the best Validators in the {NETWORK.toUpperCase()} network
              </Typography>
            </Box>
              <div className={classes.grow} />
              <TextField
                select
                value={this.state.network}
                onChange={this.handleChange}
                variant="outlined"
                disabled
                InputProps={{
                  startAdornment: (
                    <KusamaSVG className={classes.networkLogo} />
                  ),
                }}
              >
                {[{value: 2, label: "Kusama"}].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Header));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class SubstrateSection extends Component {

  handleExt = () => {
		window.open('https://substrate.io/vision/substrate-and-polkadot/', '_blank')
	}

  render() {
    const { classes } = this.props;
    
    return (  
      <Box className={classes.root} >
        <Grid container className={classes.container}>
          <Grid xs={8}>
            <Typography
            variant="h3"
            color="textSecondary"
            align="left"
            paragraph
            >Substrate & Polkadot</Typography>
            <Typography
            variant="body1"
            color="textSecondary"
            align="left"
            paragraph
            >
            Substrate is the blockchain framework that powers all the Polkadot ecosystem to be at the forefront innovation for the Web3 revolution. 
            </Typography>
            <Typography
            variant="body1"
            color="textSecondary"
            align="left"
            paragraph
            >
            Polkadot is a multichain network built by the Substrate team. A team at the cutting edge of the blockchain industry.
            </Typography>
            <Typography
            variant="body1"
            color="textSecondary"
            align="left"
            paragraph
            >
            Polkadot aims to facilitate a fully functional and user-friendly decentralized web, where users are in control.
            </Typography>
            <Typography
            variant="body1"
            color="textSecondary"
            align="left"
            paragraph
            >
              To find out more about Substrate & Polkadot super powers, have a read here.  <IconButton 
              onClick={this.handleExt}
              color="inherit"
              size="small"
              aria-label="Menu">
              <ArrowRightIcon color="inherit" />
            </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

SubstrateSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubstrateSection);
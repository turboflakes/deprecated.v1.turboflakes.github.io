import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import raidenLogo from '../../../../assets/raiden.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class PolkadotValidatorSection extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    const {scrollHere} = this.props
    if (scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  componentDidUpdate(prevProps) {
    const {scrollHere} = this.props
    if (scrollHere && prevProps.scrollHere !== scrollHere) {
      this.rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Box className={classes.container}>
          <Box className={classes.section} align="center">
            <Box className={classes.mascotBox}>
              <Box className={classes.nameBox}>
                <Typography
                    variant="h1"
                    color="textPrimary"
                    align="left"
                  >RAIDEN
                </Typography>
                <Box className={classes.nameBase} />
              </Box>
              <Box className={classes.logoBox}>
                <img src={raidenLogo} className={classes.logo} alt={"Raiden Polkadot Validator"}/>
              </Box>
            </Box>
            {/* <Box>
              <Box className={classes.descriptionBox}>
                <Typography
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                    align="left"
                  >
                    <b>Raiden</b> TODO
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box> 
    )
  }
}

PolkadotValidatorSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PolkadotValidatorSection);
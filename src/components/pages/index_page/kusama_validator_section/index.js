import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import mcLogo from '../../../../assets/momo_and_coco.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class KusamaValidatorSection extends Component {

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
              <Box className={classes.namesBox}>
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                    >MOMO
                  </Typography>
                  <Box className={classNames(classes.nameBase, classes.momoColor)} />
                </Box>
                <Typography
                    variant="h1"
                    color="textPrimary"
                    align="left"
                    className={classes.plus}
                  >+
                </Typography>
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                    >COCO
                  </Typography>
                  <Box className={classNames(classes.nameBase, classes.cocoColor)} />
                </Box>
              </Box>
              <Box className={classes.logoBox}>
                <img src={mcLogo} className={classes.logo} alt={"Momo + Coco Kusama Validators"}/>
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
                    <b>Momo + Coco</b> TODO
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box> 
    )
  }
}

KusamaValidatorSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KusamaValidatorSection);
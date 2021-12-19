import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stashDisplay } from '../../../../utils/display'
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Identicon from '@polkadot/react-identicon';
import mcLogo from '../../../../assets/momo_and_coco.svg';
import kusamaLogo from '../../../../assets/kusama_logo.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const MOMO_STASH = "FZsMKYHoQG1dAVhXBMyC7aYFYpASoBrrMYsAn1gJJUAueZX"
const COCO_STASH = "FZsMKYHoQG1dAVhXBMyC7aYFYpASoBrrMYsAn1gJJUAueZX"

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
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.mascotBox}>
              <Box className={classes.namesBox}>
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                      className={classes.nameTitle}
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
          </Grid>
          <Grid item xs={12} sm={4} className={classes.descriptionGrid}> 
            <Box className={classes.descriptionBox}>
              <Typography
                  variant="h4"
                  color="textSecondary"
                  align="left"
                  paragraph
                >Stake with TurboFlakes
              </Typography>
              <Typography
                  variant="body1"
                  color="textSecondary"
                  align="left"
                  paragraph
                ><b>Momo + Coco</b> are our non-identical Validator twins running in the Kusama Network.
              </Typography>
              <Typography
                  variant="body1"
                  color="textSecondary"
                  align="left"
                ><b>Momo's</b> commission is <b>0%</b> and <b>Coco's</b> commission is <b>7%</b>. On both you get instant rewards every era.
              </Typography>
              <Box className={classes.ident}>
                <Identicon
                  value={MOMO_STASH}
                  size={32}
                  theme={'polkadot'} />
                <Typography
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                  align="left"
                >{stashDisplay(MOMO_STASH)} <br/>TURBOFLAKES.IO/<b>MOMO</b>
                </Typography>
              </Box>
              <Box className={classes.ident}>
                <Identicon
                  value={COCO_STASH}
                  size={32}
                  theme={'polkadot'} />
                <Typography
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                  align="left"
                >{stashDisplay(COCO_STASH)} <br/>TURBOFLAKES.IO/<b>COCO</b>
                </Typography>
              </Box>
              <Box className={classes.polkadotLogoBox}>
                <img src={kusamaLogo} className={classes.polkadotLogo} alt={"Kusama Network"}/>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> 
    )
  }
}

KusamaValidatorSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KusamaValidatorSection);
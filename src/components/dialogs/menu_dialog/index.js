import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import EmailIcon from '@material-ui/icons/EmailRounded';
import { ReactComponent as TwitterSVG } from '../../../assets/twitter.svg';
import { ReactComponent as GithubSVG } from '../../../assets/github.svg';
import logo from '../../../assets/logo/logo_1_inverted_subtract_turboflakes_.svg';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

class MenuDialog extends Component {

  render() {
    const { classes, isLoggedIn, isAdmin, hasCompanies, applications,
      ...other } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          onEnter={this.handleEnter}
          onClose={this.handleClose} {...other}
          TransitionComponent={Transition}
          classes={{
            paperFullScreen: classes.dialogFullScreen
          }}
          aria-labelledby="menu-dialog-title">
          <div className={classes.closeButtonBox}>
            <IconButton aria-label="Close" classes={{ root: classes.closeButtonRoot }}  onClick={this.props.onClose}>
              <CloseIcon classes={{ root: classes.closeButtonIconRoot }} />
            </IconButton>
          </div>
          <DialogTitle id="menu-dialog-title" className={classes.titleRoot} disableTypography>
            <Link href="/" >
              <img src={logo} className={classes.logo} alt={"logo"}/>
            </Link>
          </DialogTitle>
          <DialogContent classes={{
            root: classes.contentRoot
          }}>

            
            <Link variant="h1" color="textSecondary" align="center" href="/#/about" 
              className={classes.link}>ABOUT</Link>
            <Link variant="h1" color="textSecondary" align="center" href="/#/about" 
              className={classes.link}>NEWS</Link>            
            <Link variant="h1" color="textSecondary" align="center" href="/#/about" 
              className={classes.link}>CONTACT</Link>

          </DialogContent>
          <DialogContent classes={{
            root: classes.contentRoot
          }}>
            <Box>
              <IconButton size="small" className={classes.iconEmail} onClick={this.handleEmail}>
                <EmailIcon />
              </IconButton>
              <IconButton color="primary" size="small" className={classes.icon} onClick={this.handleTwitter}>
                <TwitterSVG />
              </IconButton>
              <IconButton color="primary" size="small" className={classes.icon} onClick={this.handleGithub}>
                <GithubSVG />
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

MenuDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withWidth()(withStyles(styles)(MenuDialog));
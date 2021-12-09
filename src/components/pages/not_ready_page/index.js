import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HeaderLogo from '../header_logo'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class NotReadyPage extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    if (this.rootRef.current) {
      this.rootRef.current.scrollIntoView()
    }
  }

  componentDidUpdate() {
    if (this.rootRef.current) {
      this.rootRef.current.scrollIntoView()
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root} ref={this.rootRef}>
        <HeaderLogo />
        <Container className={classes.container}>
          <Typography variant="h2" align="center" className={classes.title}>
          Ups! It looks like we still have some work to do. This page is not ready yet 🙃
          </Typography>
          {/* 
          <Typography paragraph>
          -
          </Typography> 
          */}
        </Container>
      </div>
    )
  }
}

NotReadyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotReadyPage);

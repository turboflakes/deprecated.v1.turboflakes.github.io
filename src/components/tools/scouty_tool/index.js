import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAltRounded';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import CodeBlock from '../../code_block';
import scoutyLogo from '../../../assets/scouty.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

const gist1 = `#!/bin/bash
# simple run scouty with default options
scouty
# or be explicit about which additional data is available in the hook scripts
scouty --expose-nominators --expose-network
# to list all options try help
scouty help
`

const screenshots = [
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_democracy_started.png?raw=true",
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_validator_starts_active_next_era.png?raw=true",
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_validator_starts_inactive_next_era.png?raw=true",
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_validator_slashed.png?raw=true",
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_validator_chilled.png?raw=true",
  "https://github.com/turboflakes/scouty/blob/main/assets/matrix_validator_offline.png?raw=true",
];

class ScoutyTool extends Component {

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

  handleExt = () => {
		window.open('https://github.com/turboflakes/scouty', '_blank')
	}

  render() {
    const { classes } = this.props;
    
    return (
      <Box className={classes.root} ref={this.rootRef}>
        <Grid container className={classNames(classes.container, classes.section)}>
          <Grid item xs={12} sm={8}>
            <Box className={classes.titleBox}>
              <Box align="left">
                <Box className={classes.nameBox}>
                  <Typography
                      variant="h1"
                      color="textPrimary"
                      align="left"
                    >SCOUTY
                  </Typography>
                  <Box className={classes.nameBase}> </Box>
                </Box>
              </Box>
              <Typography
                  variant="subtitle1"
                  className={classes.inline}
                  color="textPrimary"
                  align="left"
                  paragraph
                >
                  <b>Scouty</b> is a command-line interface to keep an eye on substrate-based chains and hook things up.
              </Typography>
            </Box>
            </Grid>
            <Grid item xs={12} sm={4} align="right">
            <Box align="right" className={classes.logoBox}>
              <img src={scoutyLogo} className={classes.logo} alt={"crunch tool"}/>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={9}>
            <Box className={classes.section} align="left">
              <Typography
                  variant="h3"
                  color="textPrimary"
                  align="left"
                  paragraph
                >Why use Scouty?
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
                Scouty mainly purpose is to monitor, intercept and extend functionality as soon as on-chain events are emitted. 
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
                Maybe you just want to monitor your validator node and be up to date on the performance every session. Or maybe to manage node resources and you would like to warm up or cool down your validator node whenever it goes active or inactive the next era. Or just to check the 1KV nominations and trigger special kudos the era your validator becomes independent :)
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              To be notified about Referenda and vote from your favourite site <i>- Polkadot.js, Polkassembly, Commonwealth -</i> through a direct link.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              You could also trigger node backups every other era, publish them online and inform community as soon as the task is done.
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                paragraph
              >
              In suma, you write your own <i>bash</i> scripts, your own messages and <b>hook</b> them up to any on-chain event supported by <b>Scouty</b>. The possibilities are endless ✨
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item sm={4}/>
          <Grid item xs={12} sm={8}>
            <Box className={classes.section}>
              <CodeBlock>
                {gist1}
              </CodeBlock>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                
                >Use <b>Scouty</b> by default or with custom options. To know more about <b>Scouty</b> and installation instructions, please read here <IconButton 
                onClick={this.handleExt}
                  color="inherit"
                  size="small"
                  aria-label="Menu">
                  <ArrowRightIcon color="inherit" />
                </IconButton>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Box className={classes.section}>
              <Typography
                variant="h3"
                color="textPrimary"
                align="left"
                paragraph
              ><b>Scouty</b> + <Link href="https://matrix.org/" 
                target="_blank" rel="noreferrer" color="inherit" 
                className={classes.link}>Matrix</Link>
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                >Scouty loves matrix. Give it a try and see for yourself.
              </Typography>
            </Box>
            <ImageList className={classes.imageList} cols={2.5}>
              {screenshots.map((url) => (
                <ImageListItem key={url} classes={{
                  root: classes.rootImageListItem
                }}>
                  <img src={url} alt={url} className={classes.imgFullWidth}/>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Box> 
    )
  }
}

ScoutyTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScoutyTool);
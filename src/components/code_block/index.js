import React, {Component} from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import './grayscale-dark.css'

class CodeBlock extends Component {

  rootRef = React.createRef();

  componentDidMount() {
    if (this.rootRef) {
      hljs.highlightBlock(this.rootRef.current);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.rootRef) {
      hljs.highlightBlock(this.rootRef.current);
    }
  }

 	render() {
		const { classes } = this.props;
    return (
      <pre className={classes.root} ref={this.rootRef}>
        <code>{this.props.children}</code>
      </pre>
    )
	}
}

CodeBlock.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodeBlock);
  
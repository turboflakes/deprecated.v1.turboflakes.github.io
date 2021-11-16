import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomVel() {
  return Math.random() * 2 - 1;
}

// function rgb(i) {
//   return 'rgb(' + getRandomInt(0, 255) + ', ' + Math.floor(255 - i) + ', ' +
//   getRandomInt(127, 255) + ')';
// }

function contrast(hue) {
  let h = hue + getRandomInt(90, 180)
  if (h > 360) {
    return h - 360
  }
  return h
}

function gradient() {
  const hue = getRandomInt(0, 360);
  return {
    start: hsla(hue),
    end: hsla(contrast(hue))
  }
}

function hsla(hue) {
  return 'hsla(' + hue + ', ' + getRandomInt(50, 100) + '%, ' +
  getRandomInt(50, 80) + '%, 1)'; 
}

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    

class BoardAnimation extends Component {

  state = {
    balls: []
  }

  componentDidMount(){
    this.init();
  }

  componentDidUpdate(prevProps) {
    const {addresses, width, selected} = this.props
    if (prevProps.addresses.length !== addresses.length) {
      this.init()
    }

    if (prevProps.width !== width) {
      const canvas = document.getElementById('board')
      canvas.width = width
    }

    if (prevProps.selected !== selected) {
      const {balls} = this.state
      // Reset previous ball selected
      this.clearSelected()
      // Identify which ball was clicked
      const ball = balls.find(ball => ball.address === selected)
      if (!!ball) {
        ball.clicked = true
      }
    }

  }

  componentWillUnmount() {
    if (this.req) {
      cancelAnimationFrame(this.req);
    }
  }

  init = () => {
    const {
      selected,
      addresses,
      width,
      height
    } = this.props

    if (this.req) {
      cancelAnimationFrame(this.req);
    }
    
    const canvas = document.getElementById('board')
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')

      // set the canvas size
      canvas.width = width
      canvas.height = height

      const friction = 0.98

      let balls = []
      
      for (let i = 0; i < addresses.length; i++) {
        const g = gradient(),
        radius = 30 * (1+3*(addresses.length-i)/addresses.length);
        const ball = {
          address: addresses[i],
          bounce: 1,
          radius: radius,
          originalRadius: radius,
          x: canvas.width / 2,
          y: canvas.height / 2,
          velX: getRandomVel(),
          velY: getRandomVel(),
          colorStart: g.start,
          colorEnd: g.end
        }
        balls.push(ball);
      }

      canvas.addEventListener('dblclick', (e) => {
        console.log("__dblclick", e);
      })

      // Add event listener for `click` events.
      canvas.addEventListener('click', (e) => {
        console.log("__click", e);
        const x = e.pageX - canvas.getBoundingClientRect().left
        // Note: y should be the position Y of the mouse in the screen but related to the animated board
        // XxY at top left corner should be 0x0
        // To get Y value we first find the position Y of the mouse and remove all the aggregated height 
        // from previous components/pages
        // 
        // window.innerHeight = Landing page height
        // 410 => Nomi hero box height
        // 92 => Search box height
        const y = e.pageY - window.innerHeight - 410 - 92
        // Identify which ball was clicked
        let ball = balls.find(ball => Math.sqrt((x-ball.x)*(x-ball.x) + (y-ball.y)*(y-ball.y)) < ball.radius)
        if (!!ball) {
          // Reset previous ball selected
          this.clearSelected()
          
          ball.clicked = true
          this.props.onBallClick(ball.address)
        }
      }, false);

      if (!!selected) {
        // Initialize any selected address
        const ball = balls.find(ball => ball.address === selected)
        if (!!ball) {
          ball.clicked = true
        }
      }

      this.setState({
        canvas,
        ctx,
        friction,
        balls
      })

      this.req = requestAnimationFrame(this.update)
    }
  }

  clearSelected = () => {
    const {canvas, balls} = this.state
    // Identify which ball is open to be reset
    let ball = balls.find(ball => ball.clicked)
    if (!!ball) {
      ball.clicked = false
      ball.x = getRandomInt(canvas.width / 2, canvas.width)
      ball.y = getRandomInt(0, canvas.height)
      ball.velX = getRandomVel()
      ball.velY = getRandomVel()
      ball.radius = ball.originalRadius
    }
  }

  draw = (ball) => {
    const {
      ctx,
    } = this.state

    ctx.beginPath()

    // Define gradient
    let g = ctx.createLinearGradient(ball.x-ball.radius, ball.y-ball.radius, ball.x+ball.radius, ball.y+ball.radius);
    g.addColorStop(0, ball.colorStart);
    g.addColorStop(1, ball.colorEnd);
    ctx.fillStyle = g
    
    // Draw the dot
    ctx.arc(
      ball.x, ball.y,
      ball.radius,
      0, Math.PI * 2, true
    )

    // Sets the type of compositing operation to apply when drawing new shapes
    if (!ball.clicked) {
      // ctx.globalCompositeOperation='color-burn';
      // ctx.globalCompositeOperation='luminosity';
    }
    ctx.globalCompositeOperation='destination-over';
    // ctx.globalAlpha = 0.8;

    ctx.fill()
  }

  update = () => {
    const {
      friction,
      canvas,
      ctx,
      balls
    } = this.state

    this.req = requestAnimationFrame(this.update)

    if (!!ctx) {
      // clear the canvas and redraw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      balls.forEach((ball) => {
        if (ball.clicked) {
          ball.radius = canvas.width / 4.4
          ball.x = (canvas.width / 4.4) + 20
          ball.y = (canvas.width / 4.4) + 20
        } else {
          if (ball.y + ball.radius >= canvas.height) {
            ball.velY *= -ball.bounce
            ball.y = canvas.height - ball.radius
            ball.velX *= friction
          }
          if (ball.y - ball.radius <= 0) {
            ball.velY *= -ball.bounce
            ball.y = ball.radius
            ball.velX *= friction
          }
          if (ball.x - ball.radius <= 0) {
            ball.velX *= -ball.bounce
            ball.x = ball.radius
          }
          if (ball.x + ball.radius >= canvas.width) {
            ball.velX *= -ball.bounce
            ball.x = canvas.width - ball.radius
          }

          if (ball.velX < 0.01 && ball.velX > -0.01) {
            ball.velX = 0
          }
          if (ball.velY < 0.01 && ball.velY > -0.01) {
            ball.velY = 0
          }

          ball.x += ball.velX
          ball.y += ball.velY
        }
        this.draw(ball)
      })
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <canvas className={classes.canvas} id="board" />
      </div>
    )
  }
}

BoardAnimation.propTypes = {
  classes: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  onBallClick: PropTypes.func.isRequired,
  onBallClear: PropTypes.func.isRequired,
};

export default withStyles(styles)(BoardAnimation);

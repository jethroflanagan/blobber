import React, { Component } from 'react'
import ReactSVG from 'react-svg';
import "./Gyro.scss";
import { getDistance, clamp } from 'src/utils/math';

const MAX_SPEED = 100;

export default class Gyro extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      width: 297,
      height: 297,
      rotationX: 0,
      rotationY: 0,
      isIntro: true,
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', e => this.onMouseMove(e));
    const bounds = this.refs.container.getBoundingClientRect();
    this.setState({
      x: bounds.x,
      y: bounds.y,
    });
    setTimeout(() => {
      this.setState({
        isIntro: false,
      });
    }, 6000);
  }

  onMouseMove(e) {
    const { isIntro } = this.state;
    if (isIntro) return;
    const EFFECT = 20;
    // console.log(e.clientX, e.clientY);
    const {x, y, width, height} = this.state;
    let { clientX: mouseX, clientY: mouseY } = e;
    mouseX = mouseX - x - width / 2;
    mouseY = mouseY - y - height / 2;

    let rotationX = -mouseX / (width / 2);
    let rotationY = mouseY / (height / 2);
    rotationX = clamp(rotationX, -1, 1)  * EFFECT;
    rotationY = clamp(rotationY, -1, 1)  * EFFECT;

    this.setState({
      rotationX,
      rotationY,
    });
  }

  render() {
    const { rotationX, rotationY, isIntro } = this.state;
    let gyroX = {};
    let gyroY = {};
    if (!isIntro) {
      gyroX = { transform: `rotate3d(0, 1, 0, ${rotationX}deg)` };
      gyroY = { transform: `rotate3d(1, 0, 0, ${rotationY}deg)` };
    }
    const classNames = `Gyro ${isIntro ? 'Gyro--intro' : ''}`;
    return (
      <div className={classNames} ref="container">
        <div className="Gyro-x" style={gyroX}>
          <div className="Gyro-y" style={gyroY}>
            <div className="Gyro-pos">
              <div className="Gyro-swish">
                <ReactSVG src="./assets/gyro/gyro-swish.svg" />
              </div>
              <div className="Gyro-fill-body">
                <ReactSVG src="./assets/gyro/gyro-fill-body.svg" />
              </div>
              <div className="Gyro-fill-prop Gyro-fill-prop--top-left">
                <ReactSVG src="./assets/gyro/gyro-fill-prop.svg" />
              </div>
              <div className="Gyro-fill-prop Gyro-fill-prop--top-right">
                <ReactSVG src="./assets/gyro/gyro-fill-prop.svg" />
              </div>
              <div className="Gyro-fill-prop Gyro-fill-prop--bottom-left">
                <ReactSVG src="./assets/gyro/gyro-fill-prop.svg" />
              </div>
              <div className="Gyro-fill-prop Gyro-fill-prop--bottom-right">
                <ReactSVG src="./assets/gyro/gyro-fill-prop.svg" />
              </div>

              <div className="Gyro-prop-connectors">
                <ReactSVG src="./assets/gyro/gyro-prop-connectors.svg" />
              </div>
              <div className="Gyro-body">
                <ReactSVG src="./assets/gyro/gyro-body.svg" />
              </div>
              <div className="Gyro-prop-covers">
                <ReactSVG src="./assets/gyro/gyro-prop-covers.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

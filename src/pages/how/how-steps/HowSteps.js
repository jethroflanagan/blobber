import React, { Component } from 'react'
import ReactSVG from 'react-svg';
import { Blobber } from 'src/components/blobber/Blobber';
import "./HowSteps.scss";

export class HowSteps extends Component {

  componentDidMount() {
    const positionX = 56 * (parseInt(this.props.step) - 1);
    const blob = new Blobber({ alpha: 1, color: 0xffffff, x: positionX + 18, y: 18, radius: 12 });
      blob.createCanvas({ transparent: true, width: 209, height: 40 });
      blob.startWobbling({
        wobble: {
            position: () => ({ min: -3, max: 3 }),
            length: (length) => ({ min: length * .8, max: length * 1.2 }),
            angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
        },
        timeRange: { min: 700, max: 2500 },
      });
      blob.attachToElement(this.refs.blobs);
  }

  render() {
    const { step, title } = this.props;
    return (
      <div className="HowSteps">
        <div className="HowSteps-image">
          <ReactSVG src="./assets/how/steps.svg" />
          <div className="HowSteps-blob" ref="blobs" />
        </div>
        <h3>
          <div className="HowSteps-number">Step {step}</div>
          <div className="HowSteps-title">{title}</div>
        </h3>
      </div>
    )
  }
}

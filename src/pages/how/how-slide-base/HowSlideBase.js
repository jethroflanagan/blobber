import React, { Component } from "react";
import ReactSVG from "react-svg";
import { wobblyLineProps } from "src/pages/slide";
import { HowSteps } from '../how-steps/HowSteps';
import { Blobber } from 'src/components/blobber/Blobber';
import "./HowSlideBase.scss";

export class HowSlideBase extends Component {

  createImageBlob() {
    const blob = new Blobber({ alpha: .5, color: 0xF05A7D, x: 150, y: 150, radius: 120 });
    blob.createCanvas({ transparent: true, width: 300, height: 300 });
    blob.startWobbling({
      wobble: {
          position: () => ({ min: -10, max: 10 }),
          length: (length) => ({ min: length * .8, max: length * 1.2 }),
          angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
      },
      timeRange: { min: 700, max: 2500 },
    });
    blob.attachToElement(this.refs.blob);
  }

  componentDidMount() {
    this.createImageBlob();
  }

  createSlide({ step, title, image, content }) {
    return (
      <div className="HowSlide" {...wobblyLineProps(this.props)}>
        <div className="Page-slide">
          <div className="Page-content">
            <HowSteps step={step} title={title} />
            {content}
          </div>
          <div className="Page-image">
            <div className="HowSlide-blob" ref="blob" />
            <ReactSVG src={image} className="HowSlide-image" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (<div/>);
  }
}

import React from 'react';
import ReactSVG from 'react-svg';
import { Blobber, resolveAnchors } from 'src/components/blobber/Blobber';
import { TAU } from 'src/utils/math';
import { Page } from '../Page';
import './Why3Page.scss';

const brainFillPoints = [
  {
    control1: { x: 217.9, y: 12.62 },
    control2: {x: 128.9, y: -9.21},
    x: 173.4,
    y: 1.7,
  },
  {
    control1: { x: 292.18, y: 178.95 },
    control2: { x: 310.55, y: 83.12 },
    x: 301.36,
    y: 131.04,
  },
  {
    control1: { x: 194.42, y: 222.01 },
    control2: { x: 254.75, y: 189.26 },
    x: 225.08,
    y: 205.64,
  },
  {
    control1: { x: 163.57, y: 243.38 },
    control2: { x: 217.25, y: 244.59 },
    x: 190.41,
    y: 243.99,
  },
  {
    control1: { x: 68.28, y: 183.2 },
    control2: { x: 144.56, y: 189.26 },
    x: 106.42,
    y: 186.23,
  },
  {
    control1: { x: 49.7, y: 35.33 },
    control2: {x: -60.98, y: 139.53 },
    x: 34.37,
    y: 49.76,
  },
].map(resolveAnchors);

export class Why3Page extends Page {
  componentDidMount() {
    this.createBrainFill();
  }

  createBrainFill() {
    const width = 400; //300 * (1 + idleDistortion * 2);
    const height = 300; //244 * (1 + idleDistortion * 2);
    const x = 40;
    const y = 40;
    const blob = new Blobber({ alpha: .2, color: 0x0, x, y, anchors: brainFillPoints });
    blob.createCanvas({ transparent: true, width, height });
    this.refs.brain.appendChild(blob.getCanvas());
    blob.startWobbling({
      wobble: {
          position: () => ({ min: -10, max: 10 }),
          length: (length) => ({ min: length * .8, max: length * 1.2 }),
          angle: (angle) => ({ min: -TAU / 40, max: TAU / 40 }),
      },
      getTargets: ()=>{},
      updated: ()=>{},
      timeRange: { min: 700, max: 2500 },
    });
  }

  render() {
    return (
      <div className="Page Why3">
        <div className="Page-image">
          <div className="Why3-brainFill" ref="brain"/>
          <div className="Why3-brainOutline">
            <ReactSVG src="./assets/why/brain-symbols-placeholder.svg" />
          </div>
        </div>
        <div className="Page-content">
          <p><b>Design Thinking is your pathway to learning and acquiring these skills.</b></p>

          <p>It’s the way we will all do business in the future and it’s the quickest way to demonstrating real value and success.</p>

          <p>Let’s get started.</p>
        </div>
      </div>
    )
  }
}

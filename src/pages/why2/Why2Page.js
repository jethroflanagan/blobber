import React, { Component } from 'react'
import { Page } from '../Page';
import _map from 'lodash/map';
import './Why2Page.scss';
import { List } from 'src/components/list/List';
import ReactSVG from 'react-svg';
import { Blobber } from 'src/components/blobber/Blobber';
import { getAngle, getDistance, TAU } from 'src/utils/math';
import { randomRange } from 'src/utils/random';

function resolveAnchors(anchor) {
  const { x, y, control1, control2 } = anchor;
  const angle = getAngle(control1.x, control1.y, control2.x, control2.y);
  return {
    x,
    y,
    angle,
    lengthA: getDistance(x, y, control2.x, control2.y),
    lengthB: getDistance(x, y, control1.x, control1.y),
  };
}

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

export class Why2Page extends Page {
  componentDidMount() {
    this.createBlob();
    this.createBrainFill();
  }

  createBrainFill() {
    const width = 400; //300 * (1 + idleDistortion * 2);
    const height = 300; //244 * (1 + idleDistortion * 2);
    const x = 40;
    const y = 40;
    const blob = new Blobber({ alpha: 1, color: 0x0044cc, x, y, anchors: brainFillPoints });
    // blob.createCanvas({ backgroundColor: 0x0, width, height });
    blob.createCanvas({ transparent: true, width, height });
    this.refs.brain.appendChild(blob.getCanvas());
blob.showIntro(9000);
return
    blob.startAnimation({
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

  createBlob() {
    const width = 400; //300 * (1 + idleDistortion * 2);
    const height = 300; //244 * (1 + idleDistortion * 2);
    const radius = 100;
    const offsetX = width / 2;
    const offsetY = height / 2;

    // const anchors = [];
    // const numPoints = 4;
    // for (let i = 0; i < numPoints; i++) {
    //   const circleAngle = Math.PI * 2 * i / numPoints;
    //   const x = 0 + radius * Math.cos(circleAngle);
    //   const y = 0 + radius * Math.sin(circleAngle);
    //   anchors.push({
    //     x,
    //     y,
    //     angle: circleAngle - Math.PI / 2, // tangent to circle, not the normal
    //     lengthA: radius  /2,
    //     lengthB: radius / 2,
    //   });
    // }

    const blob = new Blobber({ radius, x: offsetX, y: offsetY, color: 0x008833, isInteractive: false });
    // blob.createCanvas({ backgroundColor: 0x0, width, height });
    blob.createCanvas({ transparent: true, width, height });
    this.refs.circle.appendChild(blob.getCanvas())

    blob.startAnimation({
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
      <div className="Page Why2">
        <div className="Page-image">
          <div className="Why2-circleFill" ref="circle"/>
          {/* <div className="Why2-brainOutline">
            <ReactSVG src="./assets/why2/brain-placeholder.svg" />
          </div> */}
        </div>
        <div className="Page-content">
          <div className="Why2-brainFill" ref="brain"/>
          <p>According to the World Economic Forum there are <b>10 skills</b> that are <b>crucial to success</b> in our ever-changing digitally-driven business environment:</p>
          {/* <List>
            <li>Complex Problem Solving</li>
            <li>Critical Thinking</li>
            <li>Creativity</li>
            <li>People Management</li>
            <li>Co-ordination with others</li>
            <li>Emotional Intelligence - Empathy</li>
            <li>Judgement and Decisions</li>
            <li>Service orientation</li>
            <li>Negotiations</li>
            <li>Cognitive Flexibility</li>
          </List> */}
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Page } from '../Page';
import _map from 'lodash/map';
import './Why2Page.scss';
import { List } from 'src/components/list/List';
import ReactSVG from 'react-svg';
import { Blobber } from 'src/components/blobber/Blobber';
import { getAngle, getDistance } from 'src/utils/math';

function resolveAnchors(anchor) {
  const { circleX, circleY, control1, control2 } = anchor;
  const angle = getAngle(control1.x, control1.y, control2.x, control2.y);
  return {
    circleX,
    circleY,
    angle,
    circleAngle: angle + Math.PI / 2,
    lengthA: getDistance(circleX, circleY, control2.x, control2.y),
    lengthB: getDistance(circleX, circleY, control1.x, control1.y),
  };
}

const brainFillPoints = [
  {
    control1: { x: 217.9, y: 12.62 },
    control2: {x: 128.9, y: -9.21},
    circleX: 173.4,
    circleY: 1.7,
  },
  {
    control1: { x: 292.18, y: 178.95 },
    control2: { x: 310.55, y: 83.12 },
    circleX: 301.36,
    circleY: 131.04,
  },
  {
    control1: { x: 194.42, y: 222.01 },
    control2: { x: 254.75, y: 189.26 },
    circleX: 225.08,
    circleY: 205.64,
  },
  {
    control1: { x: 163.57, y: 243.38 },
    control2: { x: 217.25, y: 244.59 },
    circleX: 190.41,
    circleY: 243.99,
  },
  {
    control1: { x: 68.28, y: 183.2 },
    control2: { x: 144.56, y: 189.26 },
    circleX: 106.42,
    circleY: 186.23,
  },
  {
    control1: { x: 49.7, y: 35.33 },
    control2: {x: -60.98, y: 139.53 },
    circleX: 34.37,
    circleY: 49.76,
  },
].map(resolveAnchors);


export class Why2Page extends Page {
  componentDidMount() {
    const idleDistortion = 0.03;
    const width = 400; //300 * (1 + idleDistortion * 2);
    const height = 300; //244 * (1 + idleDistortion * 2);
    const radius = 150;
    const x = 40;
    const y = 40;
    const blob = new Blobber({ alpha: .15, color: 0x000000, x, y, radius, idleDistortion, createAnchorPoints: () => this.createBrainFill({ radius, numPoints: brainFillPoints.length, idleDistortion }), numPoints: brainFillPoints.length });
    // blob.createCanvas({ backgroundColor: 0xffffff, width, height });
    blob.createCanvas({ transparent: true, width, height });
    this.refs.image.appendChild(blob.getCanvas());
  }

  createBrainFill(properties) {
    return _map(
      brainFillPoints,
      (anchor, i) => Blobber.setupAnchorPoint({ anchor, i, properties }),
    );
  }

  render() {
    return (
      <div className="Page Why2">
        <div className="Page-image">
          <div className="Why2-brainFill" ref="image"/>
          <div className="Why2-brainOutline">
            <ReactSVG src="./assets/why2/brain-placeholder.svg" />
          </div>
        </div>
        <div className="Page-content">
          <p>According to the World Economic Forum there are <b>10 skills</b> that are <b>crucial to success</b> in our ever-changing digitally-driven business environment:</p>
          <List>
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
          </List>
        </div>
      </div>
    )
  }
}

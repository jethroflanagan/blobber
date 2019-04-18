import React, { Component } from 'react';
import anime from 'animejs';
import * as pixi from 'pixi.js'
import { randomRange } from '../utils/random';
import _map from 'lodash/map';
import './Blobber.scss';

export class Blobber extends Component {
  app = null;

  // constructor() {
  //   super();
  // }

  componentDidMount() {
    this.app = new pixi.Application({
      width: 800,
      height: 800,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x222222,
    });
    document.body.appendChild(this.app.view);
    this.createBlob();
  }

  createControlPoints() {
    const controlPoints = [];
    let circleRadius = randomRange(10, 50);
    let x = 200;
    let y = 200;

    const numPoints = 4;
    for (let i = 0; i < numPoints; i++) {
      const circleAngle = Math.PI * 2 * i / numPoints;
      controlPoints.push({
        length1: randomRange(2, 20),
        length2: randomRange(2, 20),
        angle: randomRange(0, 2 * Math.PI), // should be tangent
        x: x + Math.PI * 2 * circleRadius * Math.cos(circleAngle),
        y: y + Math.PI * 2 * circleRadius * Math.sin(circleAngle),
      });
    }
    return controlPoints;
  }

  createBlob() {
    const controlPoints = this.createControlPoints();

    const blob = new pixi.Graphics();
    blob.beginFill(0x66CCFF, 1);
    blob.lineStyle(2, 0xff0000, 1);
    const firstPoint = controlPoints.shift();
    blob.moveTo(firstPoint.x, firstPoint.y);
    for (let point of controlPoints) {
      blob.lineTo(point.x, point.y);
    }
    blob.lineTo(firstPoint.x, firstPoint.y);
    blob.endFill();

    this.app.stage.addChild(blob);

  }

  render() {
    return (
      <div className="Blobber">
      </div>
    );
  }
}

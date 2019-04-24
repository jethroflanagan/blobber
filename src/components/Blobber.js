import React, { Component } from 'react';
import anime from 'animejs';
import * as pixi from 'pixi.js'
import { randomRange } from '../utils/random';
import _map from 'lodash/map';
import './Blobber.scss';
import { getDistance, getAngle, normalizeAngle } from '../utils/math';

const TAU = Math.PI * 2;
export class Blobber extends Component {
  app = null;
  container = null;
  blob = null;
  anchors = null;
  controlPoints = null;
  properties = null;

  constructor(props) {
    super();
    // TODO: move to state
    this.app = props.app;
  }

  componentDidMount() {
    this.container = new pixi.Container();
    this.blob = new pixi.Graphics();
    this.anchors = new pixi.Graphics();

    this.container.addChild(this.blob);
    this.container.addChild(this.anchors);
    this.app.stage.addChild(this.container);

    // this.blob.filters = [new pixi.filters.BlurFilter(this.props.radius / 10)];
    this.container.x = this.props.x;
    this.container.y = this.props.y;

    this.properties = this.createBasicProperties();
    this.controlPoints = this.createControlPoints();

    this.drawBlob();
    // this.drawAnchors();
    // this.animateBlob();
    this.update();
    document.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  createBasicProperties() {
    let radius = randomRange(this.props.radius * .9, this.props.radius * 1.1);
    let x = this.props.x;
    let y = this.props.y;
    const numPoints = 4;

    return {
      radius,
      x,
      y,
      numPoints,
      color: this.props.color,
    };
  }

  createControlPoints() {
    const controlPoints = [];
    let { radius: circleRadius, numPoints } = this.properties;
    for (let i = 0; i < numPoints; i++) {
      const circleAngle = TAU * i / numPoints;
      const circleX = 0 + circleRadius * Math.cos(circleAngle);
      const circleY = 0 + circleRadius * Math.sin(circleAngle);
      controlPoints.push(
        this.generateControlPointFromCircle({
            circleAngle,
            circleX,
            circleY,
        })
      );
    }
    return controlPoints;
  }

  generateControlPointFromCircle(circlePoint) {
    const { radius: circleRadius, numPoints } = this.properties;
    const { circleAngle, circleX, circleY } = circlePoint;
    const maxLength = circleRadius / numPoints * 4;
    const pointAngle = (circleAngle - Math.PI / 2) % TAU;// + randomRange(-TAU / 20, TAU / 20);
    return {
      ...circlePoint,
      // circleX: 0 + circleRadius * Math.cos(circleAngle),
      // circleY: 0 + circleRadius * Math.sin(circleAngle),

      lengthA: randomRange(maxLength * .2, maxLength),
      lengthB: randomRange(maxLength * .2, maxLength),
      angle: pointAngle, // tangent
      originalAngle: pointAngle, // save for reference
      x: circleX + randomRange(1, circleRadius / 5),
      y: circleY + randomRange(1, circleRadius / 5),
    }
  }

  drawBlob() {
    const { color } = this.properties;
    const controlPoints = this.controlPoints;
    const getAnchorPoint = this.accessAnchorPoints(controlPoints);

    const blob = this.blob;
    blob.clear();

    blob.beginFill(color, 1);
    // blob.lineStyle(2, 0xff0000, 1);
    const firstPoint = controlPoints[0];
    blob.moveTo(firstPoint.x, firstPoint.y);

    // draw from controlPoint A to controlPoint B using second anchor arm of A and first anchor arm of B
    // i.e. control point A -> B using a2 and b1
    //
    //      a2    b1
    //     /      |
    //    A-------B
    //   /        |
    //  a1        b2
    //

    for (let i = 0; i < controlPoints.length; i++) {
      let endIndex = i + 1;
      if (endIndex >= controlPoints.length) {
        endIndex = 0;
      }
      let endPoint = controlPoints[endIndex];
      const anchorA = getAnchorPoint(i, 1);
      const anchorB = getAnchorPoint(endIndex, 0);
      blob.bezierCurveTo(
        anchorA.x, anchorA.y,
        anchorB.x, anchorB.y,
        endPoint.x, endPoint.y
      );
    }
    blob.endFill();

    return blob;
  }

  // for debug
  drawAnchors() {
    const controlPoints = this.controlPoints;

    const anchors = this.anchors;
    anchors.clear();
    anchors.lineStyle(2, 0xffffff, 1);
    for (let point of controlPoints) {
      // anchors.moveTo(point.x, point.y);
      anchors.moveTo(point.x + Math.cos(point.angle) * point.lengthA, point.y + Math.sin(point.angle) * point.lengthA);
      // anchors.moveTo(point.x, point.y);
      anchors.lineTo(point.x + Math.cos(point.angle + Math.PI) * point.lengthB, point.y + Math.sin(point.angle + Math.PI) * point.lengthB);
    }
    // anchors.lineTo(firstPoint.x, firstPoint.y);
    anchors.lineStyle(2, 0xffff00, 1);

    for (let point of controlPoints) {
      anchors.drawCircle(point.x, point.y, 3);
    }

    return anchors;
  }

  accessAnchorPoints() {
    const controlPoints = this.controlPoints;

    return (index, side) => {
      const point = controlPoints[index];
      const length = point['length' + (side === 0 ? 'A' : 'B')]; // lengthA or lengthB
      const angle = point.angle + (side === 0 ? 0 : Math.PI); // add 180 if 'B'
      return {
        x: point.x + Math.cos(angle) * length,
        y: point.y + Math.sin(angle) * length,
      };
    };
  }

  animateBlob() {
    const controlPoints = this.controlPoints;
    for (let point of controlPoints) {
      this.animatePoint(point);
    }
  }

  animatePoint(point) {
    const { lengthA, lengthB, angle, x, y } = this.generateControlPointFromCircle(point);
    anime({
      lengthA,
      lengthB,
      angle,
      x,
      y,
      // circleX,
      // circleY,

      targets: point,
      easing: 'linear',
      duration: randomRange(700, 2500),
      complete: () => {
        this.animatePoint(point);
      },
    });
}

  update() {
    requestAnimationFrame(() => {
      this.drawBlob();
      this.drawAnchors();
      this.update();
    });
  }

  onMouseMove(e) {
    const { x, y, radius } = this.properties;
    const MAX_DISTANCE = 150;
    const position = {x: e.pageX - x, y: e.pageY - y};
    for (const point of this.controlPoints) {
      const distance = getDistance(point.circleX, point.circleY, position.x, position.y);
      let targetAngle = point.originalAngle;
      if (distance < 100) {
        const effect = 1 - Math.min(distance / MAX_DISTANCE, 1);
        point.x = effect * -(point.circleX - position.x) + point.circleX;
        point.y = effect * -(point.circleY - position.y) + point.circleY;

        let offsetAngle = -Math.PI / 2;
        let angle = getAngle(position.x, position.y, point.circleX, point.circleY) - Math.PI;
        if (getDistance(0, 0, position.x, position.y) < radius) {
          angle -= Math.PI;
        }
        // const diffAngle = (1-effect) * (angle) + offsetAngle + effect * point.originalAngle;
        // point.angle = angle + offsetAngle;
        // if (point.circleAngle === 0) {
        //   console.log(point.angle, diffAngle);
        // }
        targetAngle = angle + offsetAngle;
      }
      else {
        point.x = point.circleX;
        point.y = point.circleY;
        targetAngle = point.originalAngle;
      }

      targetAngle = normalizeAngle(targetAngle);

      const pointAngle = normalizeAngle(point.angle);

      // short rotation
      if (Math.abs(point.angle + TAU - targetAngle) < Math.abs(point.angle - targetAngle)) {
        point.angle += TAU;
      }

      anime({
        targets: point,
        angle: targetAngle,

        duration: 300,
        ease: 'easeOutQuart',
      });

    }
  }

  render() {
    return (
      <div className="Blobber">
      </div>
    );
  }
}

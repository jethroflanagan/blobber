import React, { Component } from 'react';
import anime from 'animejs';
import * as pixi from 'pixi.js'
import _map from 'lodash/map';
import './Blobber.scss';
import { randomRange } from 'src/utils/random';
import { getDistance, getAngle, normalizeAngle, toDegrees, getShortAngle } from 'src/utils/math';

const TAU = Math.PI * 2;
export class Blobber extends Component {
  app = null;
  containerLayer = null;
  blobLayer = null;
  anchorsLayer = null;
  anchors = null;
  properties = null;
  labelsLayer = null;

  constructor(props) {
    super();
    // TODO: move to state
    this.app = props.app;
  }

  componentDidMount() {
    this.containerLayer = new pixi.Container();
    // this.labelsLayer = new pixi.Container();
    this.blobLayer = new pixi.Graphics();
    this.anchorsLayer = new pixi.Graphics();

    this.containerLayer.addChild(this.blobLayer);
    this.containerLayer.addChild(this.anchorsLayer);
    // this.containerLayer.addChild(this.labelsLayer);
    this.app.stage.addChild(this.containerLayer);

    // this.blob.filters = [new pixi.filters.BlurFilter(this.props.radius / 10)];
    // this.blob.filters[0].blendMode = pixi.BLEND_MODES.ADD;
    this.containerLayer.x = this.props.x;
    this.containerLayer.y = this.props.y;

    this.properties = this.createBasicProperties();
    this.anchors = this.createAnchorPoints();
    // this.showIntro();
    this.drawBlob();
    // this.drawAnchors();
    this.animateBlob();
    this.update();
    document.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  showIntro() {
    // first transition
    this.anchors[0].x = 0;
    this.anchors[0].y = 0;
    this.anchors[0].lengthA = this.anchors[0].lengthB = 0;

    this.anchors[1].x = 0;
    this.anchors[1].y = 0;
    this.anchors[1].lengthA = this.anchors[0].lengthB = 0;

    this.anchors[2].x =  0;
    this.anchors[2].y = 0;
    this.anchors[2].lengthA = this.anchors[0].lengthB = 0;

    this.anchors[3].x =  0;
    this.anchors[3].y = 0;
    this.anchors[3].lengthA = this.anchors[0].lengthB = 0;

    anime({
        //  = [new pixi.filters.BlurFilter(this.props.radius / 10)];
        targets: this.blobLayer.filters[0],
        blurX: 0,
        blurY: 0,
        duration: 9000 * this.properties.radius / 300,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        complete: () => {
          this.blobLayer.filters = [];
        }
    });
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

  createAnchorPoints() {
    const anchorPoints = [];
    let { radius: circleRadius, numPoints } = this.properties;
    for (let i = 0; i < numPoints; i++) {
      const circleAngle = TAU * i / numPoints;
      const circleX = 0 + circleRadius * Math.cos(circleAngle);
      const circleY = 0 + circleRadius * Math.sin(circleAngle);
      anchorPoints.push(
        this.generateControlPointFromCircle({
          circleAngle,
          circleX,
          circleY,
          // keep ref
          originalCircleX: circleX,
          originalCircleY: circleY,
          neighborA: (i - 1 < 0 ? numPoints - 1 : i - 1), // index of neighbor on lengthA side
          neighborB: (i + 1 > numPoints - 1 ? 0 : i + 1), // index of neighbor on lengthB side
        })
      );
    }
    return anchorPoints;
  }

  generateControlPointFromCircle(circlePoint) {
    const { radius: circleRadius, numPoints } = this.properties;
    const { circleAngle, originalCircleX: circleX, originalCircleY: circleY } = circlePoint;
    const maxLength = circleRadius / numPoints * 2.5;
    const pointAngle = (circleAngle - Math.PI / 2) % TAU + randomRange(-TAU / 40, TAU / 40);
    const lengthA = randomRange(maxLength * .8, maxLength);
    const lengthB = randomRange(maxLength * .8, maxLength);

    const positionRange = circleRadius / 30;

    return {
      ...circlePoint,
      // circleX: 0 + circleRadius * Math.cos(circleAngle),
      // circleY: 0 + circleRadius * Math.sin(circleAngle),

      lengthA,
      lengthB,
      originalLengthA: lengthA,
      originalLengthB: lengthB,
      // used to smoothly transition between animated/interacted
      animatedLengthA: lengthA,
      animatedLengthB: lengthB,
      angle: pointAngle, // tangent
      originalAngle: pointAngle, // save for reference
      x: circleX + randomRange(-positionRange, positionRange),
      y: circleY + randomRange(-positionRange, positionRange),
    }
  }

  drawBlob() {
    const { color } = this.properties;
    const controlPoints = this.anchors;
    const getAnchorPoint = this.accessAnchorPoints(controlPoints);

    const blob = this.blobLayer;
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
    const controlPoints = this.anchors;

    const anchors = this.anchorsLayer;
    anchors.clear();
    anchors.lineStyle(2, 0xffffff, .7);
    for (let point of controlPoints) {
      // anchors.moveTo(point.x, point.y);
      anchors.moveTo(point.x + Math.cos(point.angle) * point.lengthA, point.y + Math.sin(point.angle) * point.lengthA);
      // anchors.moveTo(point.x, point.y);
      anchors.lineTo(point.x + Math.cos(point.angle + Math.PI) * point.lengthB, point.y + Math.sin(point.angle + Math.PI) * point.lengthB);
    }
    // anchors.lineTo(firstPoint.x, firstPoint.y);

    for (let point of controlPoints) {
      if (point.animation) {
        anchors.lineStyle(4, 0xffff00, 1);
      }
      else {
        anchors.lineStyle(4, 0x00ff00, 1);
      }
      anchors.drawCircle(point.x, point.y, 3);
    }

    return anchors;
  }

  accessAnchorPoints() {
    const controlPoints = this.anchors;

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
    const controlPoints = this.anchors;
    for (let point of controlPoints) {
      this.animatePoint(point);
    }
  }

  animatePoint(point, ease) {
    const { lengthA, lengthB, angle, x, y } = this.generateControlPointFromCircle(point);
    point.animation = anime({
      lengthA,
      lengthB,
      angle,
      x,
      y,

      // used to smoothly transition between animated/interacted
      circleX: x,
      circleY: y,


      targets: point,
      easing: ease || 'easeInOutCubic',
      duration: randomRange(700, 2500),
      complete: () => {
        this.animatePoint(point);
      },
      update: (animation) => {
        // used to smoothly transition between animated/interacted
        point.animatedLengthA = point.lengthA;
        point.animatedLengthB = point.lengthB;
        if (point.label) {
          this.updateLabel({ label: point.label, point });
        }
      }
    });
  }

  // updateLabel({ label, point }) {
  //   label.x = point.x - point.label.width / 2;
  //   label.y = point.y - point.label.height - 10;
  // }

  update() {
    requestAnimationFrame(() => {
      this.drawBlob();
      // this.drawAnchors();
      this.onUpdated();
      this.update();
    });
  }

  onUpdated() {
    this.props.onUpdated({
      anchors: this.anchors,
      properties: this.properties
    });
  }

  onMouseMove(e) {
    const { x, y, radius } = this.properties;
    const MAX_DISTANCE = radius * 1.5;
    const position = {x: e.pageX - x, y: e.pageY - y};
    for (const point of this.anchors) {
      const distance = getDistance(point.circleX, point.circleY, position.x, position.y);
      // const distance = getDistance(point.x, point.y, position.x, position.y); // SUPER blobby
      let target = {
        angle: point.originalAngle,
        x: point.circleX,
        y: point.circleY,
        lengthA: point.lengthA,
        lengthB: point.lengthB,
      };
      if (distance < MAX_DISTANCE) {
        if (point.animation) {
          point.animation.pause();
          anime.remove(point);
          point.animation = null;
        }
        // POSITION
        const distanceEffect = 1 - (distance / MAX_DISTANCE) ** .7;
        target.x = distanceEffect * position.x + (1-distanceEffect) * point.circleX;
        target.y = distanceEffect * position.y + (1-distanceEffect) * point.circleY;

        // ANGLE
        target.angle = getAngle(point.x, point.y, position.x, position.y);
        if (normalizeAngle(point.circleAngle - target.angle) > Math.PI) {
          target.angle -= Math.PI;
        }

        let maxAngle = Math.PI;
        let targetAngleDiff = normalizeAngle(getShortAngle(point.circleAngle, target.angle));
        let angleEffect = targetAngleDiff / maxAngle;

        if (targetAngleDiff < Math.PI / 2) {
          angleEffect = 1 - angleEffect;
        }


        // shift range so 0 and 100 are 0 and 50 is 100 ([0 50 100] -> [0 100 0])
        angleEffect = 1 - (angleEffect - .5) / .5;

        // change distance [0 -> MAX -> CLAMP -> 100] -> [0 100 0 0] (clamped at MAX)
        const ANGLE_DISTANCE_CLAMP_PERCENT = .8;
        const ANGLE_DISTANCE_MAX_PERCENT = .5;
        const angleDistanceMax = MAX_DISTANCE * ANGLE_DISTANCE_MAX_PERCENT;
        let angleDistanceEffect = 0;

        if (distance <= angleDistanceMax) {
          angleDistanceEffect = distance / angleDistanceMax;
        }
        else if (distance <= MAX_DISTANCE * ANGLE_DISTANCE_CLAMP_PERCENT) {
          angleDistanceEffect = 1 - (distance - angleDistanceMax) / ((MAX_DISTANCE * ANGLE_DISTANCE_CLAMP_PERCENT - angleDistanceMax));
        }
        // soften by distance
        angleEffect *= angleDistanceEffect;

        // if (point.circleAngle === 0) {
        //   console.log(Math.round(angleDistanceEffect * 100));
        // }

        target.angle = point.originalAngle - angleEffect * getShortAngle(point.originalAngle, target.angle);

        // LENGTH
        // compare lengths to neighboring
        const neighborA = this.anchors[point.neighborA];
        const neighborB = this.anchors[point.neighborB];
        const originalDistanceA = getDistance(point.circleX, point.circleY, neighborA.circleX, neighborA.circleY);
        const originalDistanceB = getDistance(point.circleX, point.circleY, neighborB.circleX, neighborB.circleY);
        const distanceA = getDistance(target.x, target.y, neighborA.x, neighborA.y);
        const distanceB = getDistance(target.x, target.y, neighborB.x, neighborB.y);
        if (neighborA.lengthB + target.lengthA > distanceA) {
          target.lengthA = Math.pow(distanceA / originalDistanceA, 1.2) * point.animatedLengthA;
        }
        if (neighborB.lengthA + target.lengthB > distanceB) {
          target.lengthB = Math.pow(distanceB / originalDistanceB, 1.2) * point.animatedLengthB;
        }

        point.x = target.x;
        point.y = target.y;
        point.angle = target.angle;
        point.lengthA = target.lengthA;
        point.lengthB = target.lengthB;
        // anime({
        //   targets: point,
        //   // x: target.x,
        //   // y: target.y,
        //   // angle: target.angle,
        //   lengthA: target.lengthA,
        //   lengthB: target.lengthB,

        //   duration: 300,
        //   ease: 'spring(1, 80, 10, 0)',
        // });
      }
      else {
        if (!point.animation) {
          this.animatePoint(point);
        }
      }


      // point.animation = anime({
      //   targets: point,
      //   x: target.x,
      //   y: target.y,
      //   angle: target.angle,

      //   duration: 300,
      //   ease: 'spring(1, 80, 10, 0)',
      // });

    }
    this.onUpdated();
  }

  render() {
    return (
      <div className="Blobber">
      </div>
    );
  }
}

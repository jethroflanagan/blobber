import anime from 'animejs';
import * as pixi from 'pixi.js';
import { getAngle, getDistance, getShortAngle, normalizeAngle } from 'src/utils/math';
import { randomRange } from 'src/utils/random';
import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';

const TAU = Math.PI * 2;
const noOp = noOp;

export function resolveAnchors(anchor) {
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

export class Blobber {
  layers = {
    container: null,
    blob: null,
    anchors: null,
  };

  animation = {
    updated: null,
    wobbleAmount: null,
    getTargets: null,
    timeRange: null,
    requestAnimationFrameId: null, // requestAnimationFrameId
    isRunning: false,
  };

  x = null; // relative point for anchors
  y = null; // relative point for anchors
  color = null;
  alpha = null;
  isInteractive = null;
  anchors = null

  graphics = null;
  anchors = null;

  // TODO: remove
  isDebug = false;

  constructor({ color = 0xffffff, alpha = 1, x = 0, y = 0, isInteractive = false, anchors = [], radius = 0, isDebug = false }) {
    this.color = color;
    this.alpha = alpha;
    this.x = x;
    this.y = y;
    this.isInteractive = isInteractive;
    this.anchors = _cloneDeep(anchors); // dereference
    this.isDebug = isDebug;
    if (anchors.length === 0) {
      this.anchors = this.createCircleAnchorPoints({ radius });
    }
  }

  getCanvas() {
    return this.graphics.view;
  }

  moveTo(x, y) {
    if (x != null) {
      this.layers.container.x = x;
      this.x = x;
    }
    if (y != null) {
      this.layers.container.y = y;
      this.y = y;
    }
  }

  useSharedCanvas({ app }) {
    this.graphics = app;
    this.setup();
  }

  createCanvas({ width, height, backgroundColor = 0x000000, transparent = false }) {
    this.graphics = new pixi.Application({
      width,
      height,
      transparent,
      backgroundColor,
      antialias: true,
    });
    this.setup();
  }

  attachToElement(el) {
    el.appendChild(this.graphics.view);
  }

  changeColor(color) {
    this.color = color;
  }

  setup() {
    const { layers } = this;
    layers.container = new pixi.Container();
    layers.blob = new pixi.Graphics();
    layers.anchors = new pixi.Graphics();

    layers.container.addChild(layers.blob);
    layers.container.addChild(layers.anchors);
    this.graphics.stage.addChild(layers.container);

    // this.layers.blob.filters = [new pixi.filters.AlphaFilter(1)];
    // this.layers.blob.filters[0].blendMode = pixi.BLEND_MODES.ADD;
    layers.container.x = this.x;
    layers.container.y = this.y;

    // this.showIntro();
    this.drawBlob();
    if (this.isInteractive) {
      // document.addEventListener('mousemove', e => this.onMouseMove(e));
      this.graphics.view.addEventListener('mousemove', e => console.log(e));
    }
    // console.log(this.anchors);
  }

  showIntro(duration) {
    // first transition
    for (const anchor of this.anchors) {
      const {x, y, lengthA, lengthB } = anchor;
      anchor.x = 0;
      anchor.y = 0;
      anchor.lengthA = anchor.lengthB = 0;
      anime({
        //  = [new pixi.filters.BlurFilter(this.props.radius / 10)];
        targets: anchor,
        x,
        y,
        lengthA,
        lengthB,
        duration, //: 9000 * this.properties.radius / 300,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        complete: () => {
          this.layers.blob.filters = [];
        }
      });
    }
    anime({
        //  = [new pixi.filters.BlurFilter(this.props.radius / 10)];
        targets: this.layers.blob.filters[0],
        blurX: 0,
        blurY: 0,
        duration, //: 9000 * this.properties.radius / 300,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        complete: () => {
          this.layers.blob.filters = [];
        }
    });
    this.animation.updated = ()=>{};
    this.update();

  }

  createCircleAnchorPoints({ radius }) {
    const anchors = [];
    const numPoints = 4;
    for (let i = 0; i < numPoints; i++) {
      const circleAngle = Math.PI * 2 * i / numPoints;
      const x = 0 + radius * Math.cos(circleAngle);
      const y = 0 + radius * Math.sin(circleAngle);
      anchors.push({
        index: i, // for animation reference if needed
        x,
        y,
        angle: circleAngle - Math.PI / 2, // tangent to circle, not the normal
        lengthA: radius  /2,
        lengthB: radius / 2,
      });
    }
    return anchors;
  }

  getWobbleAmount(property, anchor) {
    let wobbleProperty = property;
    if (property === 'lengthA' || property === 'lengthB') {
      wobbleProperty = 'length';
    }
    const { min, max } = this.animation.wobble[wobbleProperty](anchor.original[property]);
    return randomRange(min, max);
  }

  setupAnchorPointAnimationTargets(anchor) {
    const { original } = anchor;

    const pointAngle = (original.angle) % TAU + this.getWobbleAmount('angle', anchor);
    const lengthA = this.getWobbleAmount('lengthA', anchor); // randomRange(original.lengthA * .8, original.lengthA * 1.2);
    const lengthB = this.getWobbleAmount('lengthB', anchor); // randomRange(original.lengthB * .8, original.lengthB * 1.2);

    const positionRange = this.getWobbleAmount('position', anchor);
    const positionAngle = randomRange(0, TAU);
    return {
      ...anchor,
      angle: pointAngle, // tangent
      lengthA,
      lengthB,
      x: original.x + Math.cos(positionAngle) * positionRange,
      y: original.y + Math.sin(positionAngle) * positionRange,
    };
  }

  drawBlob() {
    const { color, alpha } = this;
    const anchors = this.anchors;

    const layer = this.layers.blob;
    layer.clear();

    layer.beginFill(color, alpha);
    // blob.lineStyle(2, 0xff0000, 1);
    const firstPoint = anchors[0];
    layer.moveTo(firstPoint.x, firstPoint.y);

    // draw from controlPoint A to controlPoint B using second anchor arm of A and first anchor arm of B
    // i.e. control point A -> B using a2 and b1
    //
    //      a2    b1
    //     /      |
    //    A-------B
    //   /        |
    //  a1        b2
    //

    for (let i = 0; i < anchors.length; i++) {
      let endIndex = i + 1;
      if (endIndex >= anchors.length) {
        endIndex = 0;
      }
      let endPoint = anchors[endIndex];
      const anchorA = this.getAnchorControlPoint(i, 1);
      const anchorB = this.getAnchorControlPoint(endIndex, 0);
      layer.bezierCurveTo(
        anchorA.x, anchorA.y,
        anchorB.x, anchorB.y,
        endPoint.x, endPoint.y
      );
    }
    layer.endFill();

    this.drawAnchors();
  }

  // TODO: remove (for debug only)
  drawAnchors() {
    if (!this.isDebug) return;
    const anchors = this.anchors;

    const layer = this.layers.anchors;
    layer.clear();
    layer.lineStyle(2, 0xffffff, .7);
    for (let anchor of anchors) {
      layer.moveTo(anchor.x + Math.cos(anchor.angle) * anchor.lengthA, anchor.y + Math.sin(anchor.angle) * anchor.lengthA);
      layer.lineTo(anchor.x + Math.cos(anchor.angle + Math.PI) * anchor.lengthB, anchor.y + Math.sin(anchor.angle + Math.PI) * anchor.lengthB);
    }

    for (let point of anchors) {
      if (point.animation) {
        layer.lineStyle(2, 0xffff00, 1);
      }
      else {
        layer.lineStyle(2, 0x00ff00, 1);
      }
      layer.drawCircle(point.x, point.y, 2);
    }

    return layer;
  }

  // get the control point on side A or B of the anchor
  getAnchorControlPoint(index, side) {
    const point = this.anchors[index];
    const length = point['length' + (side === 0 ? 'A' : 'B')]; // lengthA or lengthB
    const angle = point.angle + (side === 0 ? 0 : Math.PI); // add 180 if 'B'
    return {
      x: point.x + Math.cos(angle) * length,
      y: point.y + Math.sin(angle) * length,
    };
  }

  startWobbling({
    wobble = null,
    getTargets = null,
    updated = null,
    timeRange = null
  } = {}) {
    const { position, angle, length } = wobble;
    this.animation.wobble = { position, angle, length };
    this.animation.getTargets = getTargets != null ? (anchor) => getTargets(anchor) : (anchor => this.setupAnchorPointAnimationTargets(anchor));//getTargets || ((...args) => this.setupAnchorPointAnimationTargets(...args));
    this.animation.updated = updated != null ? (({ anchors, x, y }) => updated({ anchors, x, y })) : (() => {});
    this.animation.timeRange = timeRange;
    // this.updateWobble({
    //   wobble,
    //   getTargets,
    //   updated,
    //   timeRange,
    // });

    const copyProperties = ['x', 'y', 'lengthA', 'lengthB', 'angle'];

    for (let point of this.anchors) {
      point.original = {};
      _map(copyProperties, prop => point.original[prop] = point[prop]);
      this.animateAnchor(point);
    }
    this.update();
  }

  // contract({
  //   radius = null,
  //   getTargets = null,
  //   updated = null,
  //   timeRange = null
  // } = {}) {
  //   const { position, angle, length } = wobble;
  //   this.animation.wobble = { position, angle, length };
  //   this.animation.getTargets = getTargets != null ? (anchor) => getTargets(anchor) : (anchor => this.setupAnchorPointAnimationTargets(anchor));//getTargets || ((...args) => this.setupAnchorPointAnimationTargets(...args));
  //   this.animation.updated = updated || noOp;
  //   this.animation.timeRange = timeRange;
  //   // this.updateWobble({
  //   //   wobble,
  //   //   getTargets,
  //   //   updated,
  //   //   timeRange,
  //   // });

  //   const copyProperties = ['x', 'y', 'lengthA', 'lengthB', 'angle'];

  //   for (let point of this.anchors) {
  //     point.original = {};
  //     _map(copyProperties, prop => point.original[prop] = point[prop]);
  //     this.animateAnchor(point);
  //   }
  //   this.update();
  // }

  updateWobble({
    wobble = null,
    getTargets = null,
    updated = null,
    timeRange = null
  }) {
    if (wobble) {
      const { position, angle, length } = wobble;
      this.animation.wobble = { position, angle, length };
    }
    if (getTargets) {
      this.animation.getTargets = (anchor) => getTargets(anchor);
    }
    else {
      this.animation.getTargets = (anchor => this.setupAnchorPointAnimationTargets(anchor));
    }
    if (updated) {
      this.animation.updated = () => updated() || noOp;
    }
    if (timeRange) {
      this.animation.timeRange = timeRange;
    }
  }

  stopWobbling() {
    for (let point of this.anchors) {
      point.animation.pause();
    }
  }

  animateAnchor(anchor, ease) {
    let animationTargets = null;
    animationTargets = this.animation.getTargets(anchor);
    const { lengthA, lengthB, angle, x, y } = animationTargets;
    if (anchor.animation) anchor.animation.pause();
    anchor.animation = anime({
      lengthA,
      lengthB,
      angle,
      x,
      y,

      // TODO: re-add this
      // used to smoothly transition between animated/interacted
      // original: { x, y },

      targets: anchor,
      easing: ease || 'easeInOutCubic',
      duration: randomRange(this.animation.timeRange.min, this.animation.timeRange.max),

      complete: () => {
        this.animateAnchor(anchor);
      },
      update: (animation) => {
        // TODO: used to smoothly transition between animated/interacted
        // anchor.animatedLengthA = anchor.lengthA;
        // anchor.animatedLengthB = anchor.lengthB;
      }
    });
  }

  update() {
    if (this.animation.isRunning) return;
    const run = () => {
      this.animation.requestAnimationFrameId = requestAnimationFrame(() => {
        this.drawBlob();
        this.onUpdated();
        run();
      });
    }
    run();
  }

  onUpdated() {
    this.animation.updated({
      anchors: this.anchors,
      x: this.x,
      y: this.y,
    });
  }

  onMouseMove(e) {
    const { x, y } = this;
    console.log(this.graphics.view);
    const MAX_DISTANCE = 150;
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
        if (!point || !neighborA)
          debugger
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
          this.animateAnchor(point);
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
}

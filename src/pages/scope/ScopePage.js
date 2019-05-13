import _map from 'lodash/map';
import * as pixi from 'pixi.js';
import React from 'react';
import { Blobber } from 'src/components/blobber/Blobber';
import { Page } from '../Page';
import './ScopePage.scss';
import { randomRange } from 'src/utils/random';
import { ScopeContent } from './ScopeContent';

const CONTENT_BLOB_TIME_RANGE = { min: 700, max: 2500 };
const MAX_CIRCLE_RADIUS = 310;
const CONTENT_BLOB_RADIUS = 4;

export class ScopePage extends Page {
  app = null;
  circles = [
    { color: 0x500A28, radius: 310, label: 'Our world', id: 'world' },
    { color: 0x640032, radius: 220, label: 'Our communities', id: 'community' },
    { color: 0x870A3C, radius: 160, label: 'Absa as a whole', id: 'company' },
    { color: 0xAF144B, radius: 110, label: 'Your vertical', id: 'vertical' },
    { color: 0xF0325A, radius: 60, label: 'Your team', id: 'team' },
    { color: 0xF05A7D, radius: 30, label: 'You', id: 'you' },
  ];
  contentBlob = null;
  labels = [];

  constructor() {
    super();
    this.app = new pixi.Application({
      width: 800,
      height: 800,
      antialias: true,
      transparent: false,
      // resolution: 1,
      backgroundColor: 0x490924,
      // autoResize: true,
    });

    this.state = {
      activeSection: null,
      labelPositions: [],
    };

    this.createBlobs();
    this.createLines();

  }

  createLines() {
    this.labelsLayer = new pixi.Container();
    const labels = _map(this.circles, circle => {
      const line = new pixi.Graphics();
      this.labelsLayer.addChild(line);
      return {
        id: circle.id,
        label: circle.label,
        line,
        position: { x: 0, y: 0 },
        labelPosition: { x: 0, y: 0 },
      };
    });
    // this.setState({ labels });
    this.labels = labels;
    this.app.stage.addChild(this.labelsLayer);
  }

  createLabels() {
    return _map(this.labels, ({ id, label }, i) => {
      let position = this.state.labelPositions[i];
      if (!position) {
        position = { x: 0, y: 0 };
      }
      position.y -= 20;
      const style = { transform: `translate(${position.x}px, ${position.y}px)` };
      return <div className="Scope-blobLabel" key={id} style={style} onClick={e => this.takeOver(i)}>{label}</div>
    });
  }

  createBlobs() {
    const x = 400;
    const y = 400;

    this.contentBlob = new Blobber({ alpha: 1, color: 0x0, x, y, anchors: this.createContentBlobAnchorPoints({ radius: CONTENT_BLOB_RADIUS }) });
    this.contentBlob.useSharedCanvas({ app: this.app });
    // this.contentBlob.createCanvas({ width: 800, height: 800, transparent: true });

    this.contentBlob.startWobbling({
      wobble: {
          position: () => ({ min: -10, max: 10 }),
          length: (length) => ({ min: length * .8, max: length * 1.2 }), //(length) => ({ min: length * .8, max: length * 1.2 }),
          angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
      },
      timeRange: CONTENT_BLOB_TIME_RANGE,
    });

    _map(this.circles, (circle, i) => {
      const { color, radius } = circle;
      const blob = new Blobber({ alpha: 1, color, x, y, radius });
      blob.useSharedCanvas({ app: this.app });
      blob.startWobbling({
        wobble: {
            position: () => ({ min: -10, max: 10 }),
            length: (length) => ({ min: length * .8, max: length * 1.2 }),
            angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
        },
        updated: (blob) => this.onUpdateBlob({ index: i, blob }),
        timeRange: { min: 700, max: 2500 },
      });
      circle.blob = blob;
    });
  }

  createContentBlobAnchorPoints({ radius }) {
    const anchors = [];
    const numPoints = 4;
    for (let i = 0; i < numPoints; i++) {
      // Subtract 45 degrees so anchors are in corners for content transition
      const circleAngle = Math.PI * 2 * i / numPoints - Math.PI / 4;
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

  onUpdateBlob({ index, blob }) {
    if (!this.labels.length) return;
    const { anchors, x, y } = blob;
    const { line, position, labelPosition } = this.labels[index];

    // bottom
    const point = anchors[1];

    const nextPosition = index === this.labels.length - 1 ? null : this.labels[index + 1].position;
    let offsetStartY = 0;
    if (nextPosition != null) {
      offsetStartY = (nextPosition.y - point.y) / 2;
    }
    else {
      offsetStartY = (anchors[3].y - point.y) / 2;
    }

    line.x = 0;
    line.y = 0;

    const startX = x;
    const startY = y + point.y + offsetStartY;

    let labelX = x + point.original.x + 40;
    let labelY = y + this.circles[index].radius - 20;
    if (nextPosition == null) {
      labelY = y;
    }
    labelY = labelY + (startY - labelY) / 2

    position.x = point.x;
    position.y = point.y;
    labelPosition.x = labelX;
    labelPosition.y = labelY;


    // this.setState(({ labels }) => {
    //   position.x = point.x;
    //   position.y = point.y;
    //   return {
    //     labels: { ...labels }
    //   }
    // });

    line.clear();
    line.lineStyle(2, 0xffffff, 1);
    line.moveTo(startX + 3, startY);
    line.lineTo(labelX, labelY);
    line.lineStyle(2, 0xffffff, 1);
    line.drawCircle(startX, startY, 4);
    // console.log(label.x, label.y);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    this.refs.blobs.appendChild(this.app.view);

    // setTimeout(() => this.takeOver(2), 3000);
    // setTimeout(() => this.resetBlobs(), 3000);
    // document.addEventListener('click', () => this.resetBlobs);

    // TODO: remove on unmount
    this.updateLabels();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  updateLabels() {
    requestAnimationFrame(() => {
      const labelPositions = _map(this.labels, 'labelPosition');
      this.setState({
        labelPositions,
      });
      this.updateLabels();
    });
  }

  takeOver(index) {
    const activeSection = index;
    this.app.stage.removeChild(this.labelsLayer);
    this.setState({ activeSection });

    this.contentBlob.changeColor(this.circles[activeSection].color);
    this.contentBlob.updateWobble({
      getTargets: (anchor) => this.setupAnchorPointAnimationTargets({ isActive: true, anchor, radius: 0 }),
      timeRange: { min: 1500, max: 3000 },
    });

    _map(this.circles, ({ blob, radius }, i) => {
      blob.updateWobble({
        getTargets: (anchor) => this.setupAnchorPointAnimationTargets({ isActive: false, anchor, circleRadius: radius }),
        timeRange: { min: 200, max: 1000 },
      });
    });


      // blob.stopWobbling();
      // blob.startWobbling({
      //   wobble: {
      //       position: () => ({ min: -10, max: 10 }),
      //       length: (length) => ({ min: length * .8, max: length * 1.2 }),
      //       angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
      //   },
      //   updated: (blob) => this.onUpdateBlob({ index: i, blob }),
      //   timeRange: { min: 200, max: 1500 },
      //   getTargets: (anchor) => this.setupAnchorPointAnimationTargets({ circle: this.circles[i], isActive: index === i, anchor }),
      // });
  }

  resetBlobs() {
    this.setState({ activeSection: null });
    this.app.stage.addChild(this.labelsLayer);

    this.contentBlob.updateWobble({
      getTargets: null,
      timeRange: CONTENT_BLOB_TIME_RANGE,
    });

    _map(this.circles, ({ blob }, i) => {
      // blob.stopWobbling();
      blob.updateWobble({
        getTargets: null,
        timeRange: { min: 700, max: 2500 },
      });
    });
  }

  setupAnchorPointAnimationTargets({ isActive, anchor, circleRadius }) {
    const TAU = Math.PI * 2;
    const { original, index } = anchor;

    let angle = 0;//(original.angle) % TAU + this.getWobbleAmount('angle', anchor);
    let lengthA = randomRange(10, 100);//this.getWobbleAmount('lengthA', anchor); // randomRange(original.lengthA * .8, original.lengthA * 1.2);
    let lengthB = randomRange(10, 100); //this.getWobbleAmount('lengthB', anchor); // randomRange(original.lengthB * .8, original.lengthB * 1.2);

    let x = original.x;
    let y = original.y;

    const el = this.refs.blobs;
    const offsetX = el.offsetWidth / 4;
    const offsetY = 0;
    const width = el.offsetWidth / 2.7;
    const height = el.offsetHeight / 2.7;
    let positionOffset = 0;

    if (isActive) {
      // tl
      if (index === 3) {
        x = offsetX - width;
        y = - height;
        angle = TAU / 8 + Math.PI / 2;
      }
      // tr
      if (index === 0) {
        x = offsetX + width;
        y = - height;
        angle = Math.PI / 3 - Math.PI;
      }
      // br
      if (index === 1) {
        x = offsetX + width;
        y = height;
        angle = TAU / 8 - Math.PI / 2;
      }
      // bl
      if (index === 2) {
        x = offsetX - width;
        y = height;
        angle = TAU / 8;
      }
      positionOffset = 10;
    }
    else {
      // x = 0;
      // y = 0;
      const radius =  Math.pow(2, circleRadius / MAX_CIRCLE_RADIUS) * 30
      lengthA = radius / 2 + randomRange(-2, 2);
      lengthB = radius / 2 + randomRange(-2, 2);
      const circleAngle = Math.PI * 2 * index / 4;

      positionOffset = radius / 20 + 5;
      x = 0 + radius * Math.cos(circleAngle);
      y = 0 + radius * Math.sin(circleAngle);
      angle = anchor.angle;
    }

    return {
      ...anchor,
      angle, // tangent
      lengthA,
      lengthB,
      x: x + randomRange(-positionOffset, positionOffset),
      y: y + randomRange(-positionOffset, positionOffset),
    };
  }

  onResize = (e) => {
    const el = this.refs.blobs;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    this.app.renderer.resize(width, height);

    const x = width / 2 - 300;
    const y = height / 2;

    _map(this.circles, circle => {
      circle.blob.moveTo(x, y);
    });
    this.contentBlob.moveTo(x, y);

  }

  render() {
    const { activeSection } = this.state;
    let content = null;
    if (activeSection == null) {
      content = (
        <ScopeContent title="Oh my gosh" content={`
          Our future is changing at an ever-accelerating rate thanks to technology. And nowhere is this more obvious than in the <b>workplace</b>.
          Across the globe business is transforming through the application of <b>technology</b>.
          So where will you be in 5 years’ time?
          `}/>
      );
    }
    else {
      const section = this.circles[activeSection];

      content = (
        <div>
          <div className="Page-title Scope-title">
            <div className="Scope-reset" onClick={()=>this.resetBlobs()}>&lt;</div>
            {section.label}
          </div>
          <p>Blah blah.</p>
        </div>
      );
    }

    const labels = this.createLabels();

    return (
      <div className="Page Scope">
        <div className="Scope-blobs">
          <div ref="blobs" className="Scope-blobCanvas"/>
          <div className="Scope-labels">{labels}</div>
        </div>
        <div className="Page-image"> {/* keep content on right */}
        </div>
        <div className="Page-content Scope-content">
          {content}
        </div>
      </div>
    );
  }
}

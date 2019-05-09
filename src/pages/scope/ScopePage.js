import _map from 'lodash/map';
import * as pixi from 'pixi.js';
import React from 'react';
import { Blobber } from 'src/components/blobber/Blobber';
import { Page } from '../Page';
import './ScopePage.scss';
import { randomRange } from 'src/utils/random';


export class ScopePage extends Page {
  app = null;
  circles = [
    { color: 0x500A28, radius: 310, label: 'Our world' },
    { color: 0x640032, radius: 220, label: 'Our communities' },
    { color: 0x870A3C, radius: 160, label: 'Absa as a whole' },
    { color: 0xAF144B, radius: 110, label: 'Your vertical' },
    { color: 0xF0325A, radius: 60, label: 'Your team' },
    { color: 0xF05A7D, radius: 30, label: 'You' },
  ];
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
    };
  }

  createLabels() {
    this.labelsLayer = new pixi.Container();

    _map(this.circles, (circle, i) => this.createLabel({ text: circle.label, id: i }));

    this.app.stage.addChild(this.labelsLayer);
  }

  createLabel({ id, text }) {
    const PADDING_X = 10;
    const PADDING_Y = 5;

    const style = new pixi.TextStyle({
      fontFamily: 'Source Sans Pro',
      fontSize: 16,
      // fontStyle: 'italic',
      fontWeight: 400,
      fill: '#fff',
      // fill: ['#ffffff', '#00ff99'], // gradient

      dropShadow: true,
      dropShadowColor: 'rgba(0,0,0,.1)',
      dropShadowBlur: 7,
      dropShadowAngle: 0,
      dropShadowDistance: 0,
    });

    const label = new pixi.Text(text, style);
    // label.filters = [new pixi.filters.BlurFilter(this.props.radius / 10)];
    // const target = this.anchors[1];
    // target.label = label;
    // label.target = target;
    label.x = PADDING_X;
    label.y = -label.height / 2;

    const line = new pixi.Graphics();

    const background = new pixi.Graphics();
    background.lineStyle(1, 0xffffff);
    background.beginFill(0xffffff, .4);
    background.drawRoundedRect(0, label.y - PADDING_Y, label.width + PADDING_X * 3, label.height + PADDING_Y * 2, 4);
    background.endFill();


    const container = new pixi.Container();
    container.addChild(background);
    container.addChild(label);

    this.labelsLayer.addChild(line);
    this.labelsLayer.addChild(container);

    this.labels.push({ label: container, line, y: 0 });
  }

  createBlobs() {
    const x = 400;
    const y = 400;
    _map(this.circles, (circle, i) => {
      const { color, radius } = circle;
      const blob = new Blobber({ alpha: 1, color, x, y, radius });
      blob.useSharedCanvas({ app: this.app });
      this.refs.blobs.appendChild(blob.getCanvas());
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
    this.refs.blobs.appendChild(this.app.view);
  }

  onUpdateBlob({ index, blob }) {
    const { anchors, x, y } = blob;
    const { label, line } = this.labels[index];

    // bottom
    const point = anchors[1];
    this.labels[index].y = point.y;

    const nextLabel = index === this.labels.length - 1 ? null : this.labels[index + 1];
    let offsetStartY = 0;
    if (nextLabel != null) {
      offsetStartY = (nextLabel.y - point.y) / 2;
    }
    else {
      offsetStartY = (anchors[3].y - point.y) / 2;
    }

    line.x = 0;
    line.y = 0;

    const startX = x;
    const startY = y + point.y + offsetStartY;

    label.x = x + point.original.x + 40;
    label.y = y + this.circles[index].radius - 20;

    if (nextLabel == null) {
      label.y = y;
    }


    line.clear();
    line.lineStyle(2, 0xffffff, 1);
    line.moveTo(startX + 3, startY);
    line.lineTo(label.x, label.y);
    line.lineStyle(2, 0xffffff, 1);
    line.drawCircle(startX, startY, 4);
    // console.log(label.x, label.y);
  }

  componentDidMount() {
    this.createBlobs();
    this.createLabels();
    window.addEventListener('resize', this.onResize);
    this.onResize();

    // setTimeout(() => this.takeOver(2), 3000);
    // setTimeout(() => this.resetBlobs(), 3000);
    // document.addEventListener('click', () => this.resetBlobs);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  takeOver(index) {
    this.app.stage.removeChild(this.labelsLayer);
    this.setState({ activeSection: index });
    _map(this.circles, ({ blob }, i) => {
      // blob.stopWobbling();
      blob.updateWobble({
        getTargets: (anchor) => this.setupAnchorPointAnimationTargets({ isActive: index === i, anchor, circle: this.circles[i] }),
        timeRange: { min: 200, max: 1000 },
      });
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
    });
  }

  resetBlobs() {
    this.setState({ activeSection: null });
    this.app.stage.addChild(this.labelsLayer);

    _map(this.circles, ({ blob }, i) => {
      // blob.stopWobbling();
      blob.updateWobble({
        getTargets: null,
        timeRange: { min: 700, max: 2500 },
      });
    });
  }

  setupAnchorPointAnimationTargets({ isActive, anchor, circle }) {
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

      const radius = Math.pow(2, circle.radius / 300) * 30;
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

    _map(this.circles, circle => {
      circle.blob.moveTo(width / 2 - 300, height / 2);
    });
  }

  render() {
    const { activeSection } = this.state;
    let content = null;
    if (activeSection == null) {
      content = (<div className="Page-title Scope-title">
                    <div className="Scope-reset" onClick={()=>this.takeOver(0)}>&lt;</div>
            </div>
        // <div>
        //   <p>Our future is changing at an ever-accelerating rate thanks to technology. And nowhere is this more obvious than in the <b>workplace</b>.</p>
        //   <p>Across the globe business is transforming through the application of <b>technology</b>.</p>
        //   <p>So where will you be in 5 years’ time?</p>
        // </div>
      );
    }
    else {
      const section = this.circles[activeSection];

      content = (
        <div>
          <div className="Page-title Scope-title">
            <div className="Scope-reset" onClick={()=>this.resetBlobs()}>&lt;</div>
            {/* {section.label} */}
          </div>
          {/* <p>Blah blah.</p> */}
        </div>
      );
    }
    return (
      <div className="Page Scope">
        <div className="Scope-blobs" ref="blobs" />
        <div className="Page-image"> {/* keep content on right */}
        </div>
        <div className="Page-content Scope-content">
          {content}
        </div>
      </div>
    );
  }
}

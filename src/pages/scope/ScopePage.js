import React, { Component } from 'react';
import _map from 'lodash/map';
import * as pixi from 'pixi.js'

import { Blobber } from 'src/components/blobber/Blobber';
import './ScopePage.scss';

export class ScopePage extends Component {
  app = null;
  circles = [
    { color: 0x500A28, radius: 290, label: 'Our world' },
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
      resolution: 1,
      backgroundColor: 0x490924,
    });

  }

  createLabels() {
    this.labelsLayer = new pixi.Container();

    _map(this.circles, (circle, i) => this.createLabel({ text: circle.label, id: i }));

    this.app.stage.addChild(this.labelsLayer);
  }

  createLabel({ id, text }) {
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
    label.x = 10;
    label.y = 10;

    const line = new pixi.Graphics();

    this.labels.push({ label, line });
    this.labelsLayer.addChild(label);
    this.labelsLayer.addChild(line);
  }

  onUpdateBlob({ id, blob }) {
    const { anchors, properties } = blob;
    const label = this.labels[id].label;
    const line = this.labels[id].line;
    const point = anchors[1];

    // label.x = properties.x + point.originalCircleX + 80;
    // label.y = properties.y + point.originalCircleY - 10;
    label.x = properties.x + point.originalCircleX + 40;
    label.y = properties.y + point.originalCircleY - (point.originalCircleY - point.y) / 2 - 20;

    line.x = 0;
    line.y = 0;

    const startX = properties.x;
    const startY = properties.y + point.y - label.height - 0;
    line.clear();
    line.lineStyle(2, 0xffffff, 1);
    line.moveTo(startX + 3, startY);
    line.lineTo(label.x - 5, label.y + 10);
    line.lineStyle(2, 0xffffff, 1);
    line.drawCircle(startX, startY, 4);
    // console.log(label.x, label.y);
  }

  componentDidMount() {
    document.body.appendChild(this.app.view);
    this.createLabels();
  }

  render() {
    return (
      <div className="Scope">
        {_map(this.circles, (circle, i) => <Blobber app={this.app} color={circle.color} radius={circle.radius} x={200} y={200} key={i} onUpdated={blob => this.onUpdateBlob({ id: i, blob })}/>)}
      </div>
    );
  }
}

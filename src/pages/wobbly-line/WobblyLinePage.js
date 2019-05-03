import React, { Component } from 'react';
import _map from 'lodash/map';
import * as pixi from 'pixi.js'

import { Blobber } from 'src/components/Blobber';
//import './ScopePage.scss';

export class WobblyLinePage extends Component {
  app = null;
  lineLayer = null;
  containerLayer = null;
  mouseX = null;
  mouseY = null;
  hitTest = false;
  linePosY = 250;
  hitTestThreshold = 20;
  touchStart = false;
  dragDistanceLimit = 200;

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

  drawLine() {
    console.log('[drawLine]');

  }

  update() {
      console.log('[update]');

  }

  componentDidMount() {
    console.log('[componentDidMount]');

    document.body.appendChild(this.app.view);

    this.containerLayer = new pixi.Container();
    // this.labelsLayer = new pixi.Container();
    this.lineLayer = new pixi.Graphics();

    this.containerLayer.addChild(this.lineLayer);
    this.app.stage.addChild(this.containerLayer);

    document.addEventListener('mousemove', e => this.onMouseMove(e));

    this.drawLine();
  }

  onMouseMove(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;

    this.doHitTest(e);
    this.drawLine();

  }

  doHitTest(e) {
    //console.log('[hitTest] e.pageY', e.pageY);

    let distY = Math.abs(this.linePosY - e.pageY);

    //console.log('distance to line', distY);

    if (distY <= this.hitTestThreshold) {
      console.log('Touching');
      this.touchStart = true;
    }
  }

  drawLine() {

    // this.lineLayer.beginFill(0xDE3249);
    // this.lineLayer.drawRect(0, 150, 500, 100);
    // this.lineLayer.endFill();
    let cpX = 0;
    let cpY = 0;

    this.lineLayer.clear();
    this.lineLayer.lineStyle(5, 0xAA0000, 1);

    //let cpX = this.mouseX ? this.mouseX : 0;
    //let cpY = this.mouseY ? (this.touchStart ? this.mouseY - this.linePosY : 0) : 0;

    if (this.touchStart) {
      cpX = this.mouseX;
      cpY = this.mouseY - this.linePosY;

      if (Math.abs(cpY) > this.dragDistanceLimit) {
        console.log('Too far');
        this.touchStart = false;
      }
    }


    // Draw the line after all the calculations
    this.lineLayer.bezierCurveTo(0, 0, cpX, cpY, 800, 0);

    // console.log('this.mouseX', this.mouseX);
    // console.log('this.mouseY', this.mouseY);
    // console.log('cpY', cpY);


    this.lineLayer.position.x = 0;
    this.lineLayer.position.y = this.linePosY;
    //this.lineLayer.closePath();

  }

  render() {
      console.log('[render]');

    return (
      <div className="Scope">
        {/* {_map(this.circles, (circle, i) => <Blobber app={this.app} color={circle.color} radius={circle.radius} x={200} y={200} key={i} onUpdated={blob => this.onUpdateBlob({ id: i, blob })}/>)} */}
      </div>
    );
  }
}

import React, { Component } from 'react';
import _map from 'lodash/map';
import * as pixi from 'pixi.js';
import anime from 'animejs';

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
  elasticInProgress = false;
  dragDistanceLimit = 160;
  controlPoint = {
    cpX: 0,
    cpY: 0
  };

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

  updateLine() {
    console.log('[updateLine]');

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

    this.updateLine();
  }

  onMouseMove(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;

    this.doHitTest(e);
    this.updateLine();
  }

  doHitTest(e) {
    let distY = Math.abs(this.linePosY - e.pageY);

    if (distY <= this.hitTestThreshold) {
      console.log('Hit');
      this.touchStart = true;
    }
  }

  updateLine() {
    if (this.touchStart) {
      this.controlPoint.cpX = this.mouseX;
      this.controlPoint.cpY = this.mouseY - this.linePosY;

      if (Math.abs(this.controlPoint.cpY) > this.dragDistanceLimit) {
        console.log('Too far');
        this.touchStart = false;

        if (!this.elasticInProgress) {
          anime({
            targets: this.controlPoint,
            //cpX: 0,
            cpY: 0,
            round: 1,
            easing: 'spring(1, 80, 10, 20)',
            begin: () => {
              //console.log('Anime begin');
              this.elasticInProgress = true;
            },
            update: () => {
              //console.log('Anime update');
              this.drawLine();
            },
            complete: () => {
              //console.log('Anime complete');
              this.elasticInProgress = false;
            }
          });
        }
      }
    }

    // Draw the line after all the calculations
    if (!this.elasticInProgress) {
      this.drawLine();
    }

  }

  drawLine() {
    this.lineLayer.clear();
    this.lineLayer.lineStyle(5, 0xAA0000, 1);

    this.lineLayer.bezierCurveTo(0, 0, this.controlPoint.cpX, this.controlPoint.cpY, 800, 0);

    this.lineLayer.position.x = 0;
    this.lineLayer.position.y = this.linePosY;
    //this.lineLayer.closePath();
  }

  render() {
    return (
      <div className="Scope"></div>
    );
  }
}

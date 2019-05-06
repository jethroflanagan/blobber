import React, { Component } from 'react';
import * as pixi from 'pixi.js';
import anime from 'animejs';

export class WobblyLinePage extends Component {
  app = null;
  shapeWidth = 800;
  shapeHeight = 500;
  shapeOffsetY = 300;
  lineLayer = null;
  containerLayer = null;
  mouseX = null;
  mouseY = null;
  lineBounceAnimation = null;
  hitTest = false;
  hitTestThreshold = 20;
  touchStart = false;
  elasticInProgress = false;
  dragDistanceLimit = 120;
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

  componentDidMount() {
    console.log('[componentDidMount]');

    document.body.appendChild(this.app.view);

    this.containerLayer = new pixi.Container();
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
    const distY = Math.abs(this.shapeOffsetY - e.pageY);

    if (distY <= this.hitTestThreshold) {
      this.touchStart = true;

      if (this.lineBounceAnimation) {
        this.lineBounceAnimation.pause();
        this.elasticInProgress = false;
      }
    }
  }

  updateLine() {
    if (this.touchStart) {
      this.controlPoint.cpX = this.mouseX;
      this.controlPoint.cpY = this.mouseY - this.shapeOffsetY;

      // Check if the line has been dragged past the limit
      if (Math.abs(this.controlPoint.cpY) > this.dragDistanceLimit) {
        this.touchStart = false;

        if (!this.elasticInProgress) {
          this.lineBounceAnimation = anime({
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
              this.drawLine();
            },
            complete: () => {
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
    this.lineLayer.beginFill(0xAA0000);
    this.lineLayer.lineStyle(5, 0xAA0000, 1);

    this.lineLayer.bezierCurveTo(0, 0, this.controlPoint.cpX, this.controlPoint.cpY, this.shapeWidth, 0);
    this.lineLayer.lineTo(this.shapeWidth, this.shapeHeight);
    this.lineLayer.lineTo(0, this.shapeHeight);
    this.lineLayer.closePath();
    this.lineLayer.endFill();

    this.lineLayer.position.x = 0;
    this.lineLayer.position.y = this.shapeOffsetY;
    //
  }

  render() {
    return (
      <div className="Scope"></div>
    );
  }
}

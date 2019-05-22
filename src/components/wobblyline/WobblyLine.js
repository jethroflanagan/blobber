import anime from 'animejs';

export class WobblyLine {
  app = null;
  container = null;
  shapeWidth = 800;
  shapeHeight = 40;
  shapeOffsetX = 0;
  shapeOffsetY = 0;
  lineLayer = null;
  containerLayer = null;
  mouseX = null;
  mouseY = null;
  lineBounceAnimation = null;
  hitTest = false;
  hitTestThreshold = 6;
  touchStart = false;
  elasticInProgress = false;
  dragDistanceLimit = 60;
  dropSize = 400;
  controlPoint = {
    cpX: 0,
    cpY: 0
  };

  constructor({ app = null, color = 0xffffff, graphics = null }) {
    this.app = app;
    this.color = color;
    this.graphics = graphics;
    this.updateLine();
  }

  onMouseMove({ mouseX, mouseY }) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;

    this.doHitTest();
    this.updateLine();
  }

  doHitTest(e) {
    const distY = Math.abs(this.shapeOffsetY - this.mouseY);

    if (distY <= this.hitTestThreshold && this.mouseX >= this.shapeOffsetX) {
      this.touchStart = true;

      if (this.lineBounceAnimation) {
        this.lineBounceAnimation.pause();
        this.elasticInProgress = false;
      }
    }
  }

  update(offsetX, offsetY, offsetWidth, offsetHeight, dragDistanceLimit) {
    this.shapeOffsetX = offsetX;
    this.shapeOffsetY = offsetY;
    this.shapeWidth = offsetWidth;
    this.shapeHeight = offsetHeight;
    this.dragDistanceLimit = dragDistanceLimit;
    this.doHitTest();
    this.updateLine();
  }

  updateLine() {
    if (this.touchStart) {
      this.controlPoint.cpX = this.mouseX - this.shapeOffsetX;
      this.controlPoint.cpY = this.mouseY - this.shapeOffsetY;

      // Check if the line has been dragged past the limit
      const controlDistanceY = Math.abs(this.controlPoint.cpY);
      if (controlDistanceY > this.dragDistanceLimit) {
        // hard limit so the line doesn't extend beyond dragLimit
        this.controlPoint.cpY = Math.min(controlDistanceY, this.dragDistanceLimit) * (this.controlPoint.cpY > 0 ? 1 : -1);

        this.touchStart = false;

        if (!this.elasticInProgress) {
          this.lineBounceAnimation = anime({
            targets: this.controlPoint,
            //cpX: 0,
            cpY: 0,
            round: 1,
            easing: 'spring(1, 80, 10, 20)',
            begin: () => {
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
    const overflowWidth = 50;
    const startX = -overflowWidth;
    const width = this.shapeWidth + overflowWidth * 2;
    const dropSize = Math.min(this.dropSize, width / 2);

    this.graphics.clear();
    this.graphics.beginFill(this.color);
    this.graphics.lineStyle(1, this.color, 1);

    this.graphics.moveTo(startX, 0);

    // this.graphics.bezierCurveTo(startX, 0, this.controlPoint.cpX, this.controlPoint.cpY, width, 0);

    // previous bezier:
    const dropStartX = Math.max(this.controlPoint.cpX - dropSize * 2, startX);
    const dropStartControlX = Math.max(this.controlPoint.cpX - dropSize, startX);
    const dropCenterControlX1 = Math.max(this.controlPoint.cpX - dropSize / 2, startX);
    const dropCenterControlX2 = Math.min(this.controlPoint.cpX + dropSize / 2, width);
    const dropEndControlX = Math.min(this.controlPoint.cpX + dropSize, width);
    const dropEndX = Math.min(this.controlPoint.cpX + dropSize * 2, width);

    this.graphics.lineTo(dropStartX, 0);
    this.graphics.bezierCurveTo(dropStartControlX, 0, dropCenterControlX1, this.controlPoint.cpY, this.controlPoint.cpX, this.controlPoint.cpY);
    this.graphics.bezierCurveTo(dropCenterControlX2, this.controlPoint.cpY, dropEndControlX, 0, dropEndX, 0);
    this.graphics.lineTo(width, 0);


    this.graphics.lineTo(width, this.shapeHeight);
    this.graphics.lineTo(startX, this.shapeHeight);
    this.graphics.closePath();
    this.graphics.endFill();

    // Debug control point by uncommenting these lines
    // this.graphics.lineStyle(1, 0xffffff, 1);
    // this.graphics.beginFill(0xffffff, .6);
    // this.graphics.drawCircle(this.controlPoint.cpX, this.controlPoint.cpY, 4);
    // this.graphics.endFill();
    //

    this.graphics.position.x = 0;
    this.graphics.position.y = this.shapeOffsetY;
  }
}

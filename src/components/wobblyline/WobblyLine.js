import anime from 'animejs';

export class WobblyLine {
  app = null;
  container = null;
  shapeWidth = 800;
  shapeHeight = 140;
  shapeOffsetX = 0;
  shapeOffsetY = 70;
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

  update(offsetX, offsetY, offsetWidth, offsetHeight) {
    this.shapeOffsetX = offsetX;
    this.shapeOffsetY = offsetY;
    this.shapeWidth = offsetWidth;
    this.shapeHeight = offsetHeight;

    this.doHitTest();
    this.updateLine();
  }

  updateLine() {
    if (this.touchStart) {
      this.controlPoint.cpX = this.mouseX - this.shapeOffsetX;
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
    this.graphics.clear();
    this.graphics.beginFill(this.color);
    this.graphics.lineStyle(1, this.color, 1);

    this.graphics.bezierCurveTo(0, 0, this.controlPoint.cpX, this.controlPoint.cpY, this.shapeWidth, 0);
    this.graphics.lineTo(this.shapeWidth, this.shapeHeight);
    this.graphics.lineTo(0, this.shapeHeight);
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

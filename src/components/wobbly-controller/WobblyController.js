import * as pixi from 'pixi.js';
import './WobblyController.scss';
import { WobblyLine } from '../wobblyline/WobblyLine';

export class WobblyController {
  app = null;
  containerEl = null;
  contentEl = null;
  mouseX = null;
  mouseY = null;
  pages = [];
  scrollPosition = 0;
  shapeHeight = 140;
  shapeOffsetX = 240;

  constructor({ containerEl, contentEl }) {
    this.containerEl = containerEl;
    this.contentEl = contentEl;
    this.app = new pixi.Application({
      width: 800,
      height: 800,
      antialias: true,
      transparent: true,
      resolution: 1
    });

    this.containerEl.appendChild(this.app.view);

    for (const page of contentEl.children) {
      this.pages.push({ page, line: null });
    }

    this.createLines();
    this.updateLines();

    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', _ => this.resize());
    contentEl.addEventListener('scroll', _ => this.onScroll());

    this.resize();
  }

  createLines() {
    // Todo: remove this line - used for testing
    //this.pages = this.pages.splice(0, 1);
    //

    for (const item of this.pages) {
      const itemGraphics = new pixi.Graphics();
      this.app.stage.addChild(itemGraphics);

      const wobblyLine = new WobblyLine({app: this.app, color: item.page.dataset.color, graphics: itemGraphics });
      item.line = wobblyLine;
    }
  }

  updateLines() {
    for (const item of this.pages) {
      const { line, page } = item;

      item.line.update(this.shapeOffsetX, page.offsetTop + page.offsetHeight - this.scrollPosition - (this.shapeHeight / 2), page.offsetWidth, this.shapeHeight);
    }
  }

  onScroll(e) {
    this.scrollPosition = this.contentEl.scrollTop;
    this.updateLines();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    for (const item of this.pages) {
      item.line.onMouseMove({mouseX: this.mouseX, mouseY: this.mouseY});
    }
  }

  resize() {
    this.app.renderer.resize(this.containerEl.offsetWidth, this.containerEl.offsetHeight);
    this.updateLines();
  }
}

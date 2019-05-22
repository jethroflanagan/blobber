import React from "react";
import { HowSlideBase } from 'src/pages/how/how-slide-base/HowSlideBase';
import "./HowSlide4.scss";

export class HowSlide4 extends HowSlideBase {
  render() {
    return this.createSlide({
      step: 4,
      title: 'Prototype & Test',
      content: <>
        <p>Design Thinking is <b>experimental and iterative</b>.</p>

        <p>Measure, learn, iterate... so that we can optimise our solutions. Making mock-ups, pushes your ideas further and makes things that seems crazy suddenly seem possible. Test with real humans early &amp; often.</p>
      </>,
      image: './assets/how/image-step-4.svg',
    });
  }
}

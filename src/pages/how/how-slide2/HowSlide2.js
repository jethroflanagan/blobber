import React from "react";
import { HowSlideBase } from 'src/pages/how/how-slide-base/HowSlideBase';
import "./HowSlide2.scss";

export class HowSlide2 extends HowSlideBase {
  render() {
    return this.createSlide({
      step: 2,
      title: 'Define',
      content: <>
        <p>Design Thinking is <b>95% about the problem</b>.</p>
        <p>Define what problems we’re going to solve. If you try to prescribe a cure before diagnosing the sickness, you’ll cause more harm than good.</p>
        <p>Falling in love with a solution means you’ll stick with a bad idea against the evidence.</p>
      </>,
      image: './assets/how/image-step-2.svg',
    });
  }
}

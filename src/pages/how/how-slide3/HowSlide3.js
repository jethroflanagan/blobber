import React from "react";
import { HowSlideBase } from 'src/pages/how/how-slide-base/HowSlideBase';
import "./HowSlide3.scss";

export class HowSlide3 extends HowSlideBase {
  render() {
    return this.createSlide({
      step: 3,
      title: 'Ideate',
      content: <>
        <p>Design Thinking is <b>intuitive and exploratory</b>.</p>

        <p>Create solutions that solve those problems within constraints. To have a good idea, gather lots of input and generate lots of ideas.</p>
      </>,
      image: './assets/how/image-step-3.svg',
    });
  }
}

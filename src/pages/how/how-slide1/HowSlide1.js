import React from "react";
import { HowSlideBase } from 'src/pages/how/how-slide-base/HowSlideBase';
import "./HowSlide1.scss";

export class HowSlide1 extends HowSlideBase {
  render() {
    return this.createSlide({
      step: 1,
      title: 'Empathise',
      content: <>
        <p>Design Thinking is <b>people-centred</b></p>

        <p>Understand what customers want,  and where and when they want it.</p>
        <p>Working directly with the people you’re designing for keeps your solutions truly on track.</p>
        <p>See human needs and goals that go beyond organisational silos and technical systems.</p>
      </>,
      image: './assets/how/image-step-1.svg',
    });
  }
}

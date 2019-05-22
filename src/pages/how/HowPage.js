import React from 'react';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { HowSlide1 } from './how-slide1/HowSlide1';
import { HowSlide2 } from './how-slide2/HowSlide2';
import { HowSlide3 } from './how-slide3/HowSlide3';
import { HowSlide4 } from './how-slide4/HowSlide4';
import './HowPage.scss';

export class HowPage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
    this.createWobblyLines();
  }

  render() {
    return (
      this.createPage({
        lead: 'How to',
        title: 'Make things for humans',
        slides: <>
          <HowSlide1 color={SLIDE_COLOR_DARK} />
          <HowSlide2 color={SLIDE_COLOR_MEDIUM} />
          <HowSlide3 color={SLIDE_COLOR_DARK} />
          <HowSlide4 color={SLIDE_COLOR_MEDIUM} />
        </>,
        backUrl: '/where',
        nextUrl: '/case-studies',
      })
    );
  }
}

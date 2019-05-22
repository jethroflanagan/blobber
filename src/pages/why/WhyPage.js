import React from 'react';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import './WhyPage.scss';

export class WhyPage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
    this.createWobblyLines({ containerEl: this.refs.wobblyLines, contentEl: this.refs.content });
  }

  render() {
    return (
      this.createPage({
        lead: 'Understanding',
        title: 'The problem',
        slides: <>
          <WhySlide1 color={SLIDE_COLOR_DARK} />
          <WhySlide2 color={SLIDE_COLOR_MEDIUM} />
          <WhySlide3 color={SLIDE_COLOR_DARK} />
        </>,
        backUrl: '/',
        nextUrl: '/where',
      })
    );
  }
}

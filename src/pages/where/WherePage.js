import React from 'react';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { WhereSlide1 } from './where-slide1/WhereSlide1';
import { WhereSlide2 } from './where-slide2/WhereSlide2';
import './WherePage.scss';

export class WherePage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
    this.createWobblyLines();
  }

  render() {
    return (
      this.createPage({
        lead: 'Put it',
        title: 'Into practice',
        slides: <>
          <WhereSlide1 color={SLIDE_COLOR_DARK} />
          <WhereSlide2 color={SLIDE_COLOR_MEDIUM} />
        </>,
        backUrl: '/why',
        nextUrl: '/how',
      })
    );
  }
}

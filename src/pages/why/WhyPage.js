import React from 'react';
import { Page } from 'src/pages/Page';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import './WhyPage.scss';
import ReactSVG from 'react-svg';

export class WhyPage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Page Why">
        <h1 className="Page-header"><div className="Page-headerLead">Understanding</div>The Problem</h1>
        <WhySlide1 />
        <WhySlide2 />
        <WhySlide3 />
      </div>
    );
  }
}

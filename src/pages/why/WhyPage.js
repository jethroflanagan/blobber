import React from 'react';
import { Page } from 'src/pages/Page';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import './WhyPage.scss';

export class WhyPage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    const { color } = this.props;

    return (
      <div className="Page" style={{background: color }}>
        <h1 className="Page-header"><div className="Page-headerLead">Understanding</div>The Problem</h1>
        <div className="Page-navigation Page-navigation--top">
          <NavigationArrow color={color} direction="back" url="/" />
        </div>
        <WhySlide1 />
        <WhySlide2 />
        <WhySlide3 />
        <div className="Page-navigation Page-navigation--bottom">
          <NavigationArrow color={color} direction="next" url="/where" />
        </div>
      </div>
    );
  }
}

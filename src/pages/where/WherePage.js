import React from 'react';
import { Page } from 'src/pages/Page';
import { WhereSlide1 } from './where-slide1/WhereSlide1';
import { WhereSlide2 } from './where-slide2/WhereSlide2';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import './WherePage.scss';

export class WherePage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    const { color } = this.props;

    return (
      <div className="Page" style={{background: color }}>
        <h1 className="Page-header"><div className="Page-headerLead">Put it</div>Into Practice</h1>
        <div className="Page-navigation Page-navigation--top">
          <NavigationArrow color={color} direction="back" url="/why" />
        </div>
        <WhereSlide1 />
        <WhereSlide2 />
        <div className="Page-navigation Page-navigation--bottom">
          <NavigationArrow color={color} direction="next" url="/how" />
        </div>
      </div>
    );
  }
}

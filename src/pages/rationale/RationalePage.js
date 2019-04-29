import React, { Component } from 'react';
import './RationalePage.scss';
import './RationalePage.scss';
import Gyro from './gyro/Gyro';
import { Page } from 'src/pages/Page';

export class RationalePage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Page Rationale">
        <div className="Page-image">
          <Gyro />
        </div>
        <div className="Page-content">
          <p>Our future is changing at an ever-accelerating rate thanks to technology. And nowhere is this more obvious than in the <b>workplace</b>.</p>
          <p>Across the globe business is transforming through the application of <b>technology</b>.</p>
          <p>So where will you be in 5 years’ time?</p>
        </div>
      </div>
    );
  }
}

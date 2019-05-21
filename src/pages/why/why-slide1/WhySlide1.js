import React, { Component } from 'react';
import Gyro from './gyro/Gyro';
import './WhySlide1.scss';
import ReactSVG from 'react-svg';
import { wobblyLineProps } from 'src/pages/Page';

export class WhySlide1 extends Component {
  componentDidMount() {
  }

  render() {
    const { color } = this.props;
    const wobbly = wobblyLineProps({ color })
    return (
      <div className="WhySlide1" {...wobbly}>
        <div className="Page-slide">
          <div className="Page-content">
            <p>Our future is changing at an ever-accelerating rate thanks to technology. And nowhere is this more obvious than in the <b>workplace</b>.</p>
            <p>Across the globe business is transforming through the application of <b>technology</b>.</p>
            <p>So where will you be in 5 years’ time?</p>
          </div>
          <div className="Page-image">
            <Gyro />
          </div>
        </div>
      </div>
    )
  }
}

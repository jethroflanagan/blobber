import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { wobblyLineProps } from 'src/pages/slide';
import './WhySlide3.scss';

export class WhySlide3 extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="WhySlide3" {...wobblyLineProps({ color: this.props.color })}>
        <div className="Page-slide">
          <div className="Page-content">
            <p><b>Design Thinking is your pathway to learning and acquiring these skills.</b></p>

            <p>It’s the way we will all do business in the future and it’s the quickest way to demonstrating real value and success.</p>

            <p>Let’s get started.</p>
          </div>
          <div className="Page-image">
            <ReactSVG src="./assets/why/brain-growth-placeholder.svg" />
          </div>
        </div>
      </div>
    )
  }
}

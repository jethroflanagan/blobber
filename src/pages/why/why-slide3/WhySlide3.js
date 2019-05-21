import React from 'react';
import ReactSVG from 'react-svg';
import { Blobber, resolveAnchors } from 'src/components/blobber/Blobber';
import { TAU } from 'src/utils/math';
import { Page } from 'src/pages/Page';
import './WhySlide3.scss';
import { wobblyLineProps } from '../../Page';

export class WhySlide3 extends Page {
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

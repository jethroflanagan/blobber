import React from 'react';
import ReactSVG from 'react-svg';
import { Blobber, resolveAnchors } from 'src/components/blobber/Blobber';
import { TAU } from 'src/utils/math';
import { Page } from '../Page';
import './How2Page.scss';

export class How2Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page How2">
        <div className="Page-image">
          <ReactSVG src="./assets/how/step2.svg" />
        </div>
        <div className="Page-content">
          <h2 className="Page-lead">Design Thinking is</h2>
          <h2 className="Page-title">95% about<br/>the problem</h2>

          <p>Define what problems we’re going to solve. If you try to prescribe a cure before diagnosing the sickness, you’ll cause more harm than good.</p>
          <p>Falling in love with a solution means you’ll stick with a bad idea against the evidence.</p>
        </div>
      </div>
    )
  }
}

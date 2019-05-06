
import React from 'react';
import ReactSVG from 'react-svg';
import { Blobber, resolveAnchors } from 'src/components/blobber/Blobber';
import { TAU } from 'src/utils/math';
import { Page } from '../Page';
import './How4Page.scss';

export class How4Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page How4">
        <div className="Page-image">
          <ReactSVG src="./assets/how/step4.svg" />
        </div>
        <div className="Page-content">
          <h2 className="Page-lead">Design Thinking is</h2>
          <h2 className="Page-title">Design Thinking is<br/>experimental and iterative.</h2>

          <p>Measure, learn, iterate&ellips; so that we can optimise our solutions. Making mock-ups, pushes your ideas further and makes things that seems crazy suddenly seem possible. Test with real humans early & often.</p>
        </div>
      </div>
    )
  }
}

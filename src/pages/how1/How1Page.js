import React from 'react';
import ReactSVG from 'react-svg';
import { Blobber, resolveAnchors } from 'src/components/blobber/Blobber';
import { TAU } from 'src/utils/math';
import { Page } from '../Page';
import './How1Page.scss';

export class How1Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page How1">
        <div className="Page-image">
          <ReactSVG src="./assets/how/step1.svg" />
        </div>
        <div className="Page-content">
          <h2 className="Page-lead">Design Thinking is</h2>
          <h2 className="Page-title">people-centred</h2>

          <p>Understand what customers want,  and where and when they want it.</p>
          <p>Working directly with the people you’re designing for keeps your solutions truly on track.</p>
          <p>See human needs and goals that go beyond organisational silos and technical systems.</p>
        </div>
      </div>
    )
  }
}

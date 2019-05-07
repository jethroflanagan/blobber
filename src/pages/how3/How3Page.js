
import React from 'react';
import ReactSVG from 'react-svg';
import { Page } from '../Page';
import './How3Page.scss';

export class How3Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page How3">
        <div className="Page-image">
          <ReactSVG src="./assets/how/step3.svg" />
        </div>
        <div className="Page-content">
          <h2 className="Page-lead">Design Thinking is</h2>
          <h2 className="Page-title">intuitive<br/>and exploratory</h2>

          <p>Create solutions that solve those problems within constraints. To have a good idea, gather lots of input and generate lots of ideas.</p>
        </div>
      </div>
    )
  }
}

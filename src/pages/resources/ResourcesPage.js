import React from 'react';
import ReactSVG from 'react-svg';
import { Page } from '../Page';
import { Button } from 'src/components/button/Button';
import './ResourcesPage.scss';

export class ResourcesPage extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page Resources">
        <div className="Resources-content">
          <h2 className="Resources-title"><b>Start your journey today</b> - step into the future with Design Thinking</h2>
          <div className="Card-list">
            <div className="Card">
              <div className="Card-title">Download Made for<br/>Humans Manual</div>
              <div className="Card-content">There's all these words here</div>
              <Button icon="./assets/download-icon.svg">Download</Button>
            </div>
            <div className="Card">
              <div className="Card-title">Take on the Design<br/>Sprint Challenge</div>
              <div className="Card-content">Check all the steps there are only like 4, you'll be fine.</div>
              <Button icon="./assets/link-icon.svg">Go to the site</Button>
            </div>
          </div>

          <div className="Footer">

            <div className="Footer-logos">
              <div className="Footer-association">
                In association with
              </div>
              <ReactSVG src="./assets/resources/made-for-humans.svg" />
              <ReactSVG src="./assets/resources/abacus.svg" />
            </div>
            <div className="Footer-copy">
              © Copyright Absa Group 2019. All rights reserved.
              <span className="Footer-copyBy">Made with Love by FT</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

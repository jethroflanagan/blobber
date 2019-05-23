import React from 'react';
import { Page } from 'src/pages/Page';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import './IntroPage.scss';
import { rgbToHex } from '../../utils/math';
import ReactSVG from 'react-svg';

export class IntroPage extends Page {
  // include to not use wobbly line
  componentDidMount() {
  }

  render() {
    const { color, nextUrl } = this.props;
    return (
      <div style={{ background: rgbToHex(color) }}>
        <div className="Page Intro">
          <div className="Intro-content">
            <div className="Intro-logos">
              <ReactSVG src="./assets/absa-logo.svg" />
              <ReactSVG src="./assets/made-for-humans.svg" />
            </div>
            <div className="Intro-quote">
              <div className="Intro-quoteMark">
                <ReactSVG src="./assets/intro/quotes.svg" />
              </div>
              <div className="Intro-quoteText">
                The great solution to all human problems is individual inner transformation.
              </div>
              <div className="Intro-quoteAuthor">
                - Vernon Howard
              </div>
            </div>
          </div>
          <div className="Intro-arrow">
            <NavigationArrow color={'#ffffff'} direction="next" url={nextUrl} />
          </div>
        </div>
      </div>
    );
  }
}

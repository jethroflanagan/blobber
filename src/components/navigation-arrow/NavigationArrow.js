import React, { Component } from "react";
import ReactSVG from 'react-svg';
import { navigate } from "@reach/router"
import "./NavigationArrow.scss";
import { rgbToHex } from '../../utils/math';

export class NavigationArrow extends Component {

  navigateToUrl() {
    navigate(this.props.url);
  }

  render() {
    const { color, direction } = this.props;
    const position = direction === 'next' ? 'bottom' : 'top';
    const colorHex = rgbToHex(color);
    return (
      <div className={`Navigation-container Navigation-container--${position}`}>
        <div className={`Navigation Navigation--${direction}`} onClick={e => this.navigateToUrl()}>
          <div className="Navigation-arrow">
            <ReactSVG src="./assets/arrow-back.svg" />
          </div>
          <div className="Navigation-line" style={{ background: colorHex }} />
        </div>
      </div>
    );
  }
}

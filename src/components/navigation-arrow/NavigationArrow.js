import React, { Component } from "react";
import ReactSVG from 'react-svg';
import { navigate } from "@reach/router"
import "./NavigationArrow.scss";

export class NavigationArrow extends Component {

  navigateToUrl() {
    navigate(this.props.url);
  }

  render() {
    const { color, direction } = this.props;
    const classNames = `Navigation Navigation--${direction}`;
    return (
      <div className={classNames} onClick={e => this.navigateToUrl()}>
        <div className="Navigation-arrow">
          <ReactSVG src="./assets/arrow-back.svg" />
        </div>
        <div className="Navigation-line" style={{ background: color }} />
      </div>
    );
  }
}

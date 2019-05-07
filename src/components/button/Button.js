import React from "react";
import ReactSVG from 'react-svg';
import "./Button.scss";

export class Button extends React.Component {

  render() {
    const { children, icon } = this.props;
    return (
      <div className="Button">
        <span className="Button-icon"><ReactSVG src={icon} /></span>
        <span className="Button-label">{children}</span>
      </div>
    );
  }
}

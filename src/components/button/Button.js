import React from "react";
import ReactSVG from 'react-svg';
import "./Button.scss";

export class Button extends React.Component {

  render() {
    const { children, icon, transparent } = this.props;
    return (
      <div className={`Button ${transparent ? 'Button--transparent': ''}`}>
        <span className="Button-icon"><ReactSVG src={icon} /></span>
        <span className="Button-label">{children}</span>
      </div>
    );
  }
}

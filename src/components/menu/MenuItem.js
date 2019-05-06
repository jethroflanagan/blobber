import React, { Component } from 'react'
import "./MenuItem.scss";

export default class MenuItem extends Component {
  render() {
    const { label, isActive } = this.props;
    const classNames = `MenuItem ${isActive ? 'MenuItem--active': ''}`;
    return (
      <div className={classNames}>
        <div className="MenuItem-line" />
        <div className="MenuItem-label">
          {label}
        </div>
      </div>
    )
  }
}

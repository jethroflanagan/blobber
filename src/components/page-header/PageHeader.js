import React, { Component } from 'react'
import "./PageHeader.scss";
import { rgbToHex } from '../../utils/math';

export class PageHeader extends Component {
  render() {
    const { lead, title, color } = this.props;
    const colorHex = rgbToHex(color);
    return (
      <header className="PageHeader" data-color={color}>
          <h1 className="PageHeader-container">
            <div className="PageHeader-lead" style={{color: colorHex}}>{lead}</div>
            <div>{title}</div>
          </h1>
      </header>
    )
  }
}

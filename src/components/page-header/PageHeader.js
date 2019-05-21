import React, { Component } from 'react'
import "./PageHeader.scss";

export default class PageHeader extends Component {
  render() {
    const { lead, title, color } = this.props;
    return (
      <header className="PageHeader" data-color={color}>
          <h1 className="PageHeader-container">
            <div className="PageHeader-lead">{lead}</div>
            {title}
          </h1>
      </header>
    )
  }
}

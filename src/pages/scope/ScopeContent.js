import React, { Component } from 'react'
import "./ScopeContent.scss";

export class ScopeContent extends Component {
  render() {
    const { title, content } = this.props;
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x="0" y="0" width="200" height="100" />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="200" height="100" />

        {/* <circle cx="100" cy="100" r="100" clipPath="url(#cut-off-bottom)" /> */}
        <foreignObject x="0" y="0" width="300" height="300">
          <h2 className="ScopeContent-title" >{title}</h2>
          <div className="ScopeContent-content" x="0" y="80" width="200">{content}</div>
        </foreignObject>
      </svg>
    );
  }
}

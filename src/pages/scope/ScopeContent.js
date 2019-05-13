import React, { Component } from 'react'
import _map from 'lodash/map';
import "./ScopeContent.scss";

export class ScopeContent extends Component {
  transformPointsToPath({ points, offset }) {
    if (!points.length) return '';

    // let path = `M ${points[0].x + offset.x} ${points[0].y + offset.y} `;
    let path = 'M 0 0 ';
    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        // path += `M ${points[0].x + offset.x} ${points[0].y + offset.y} `;
      }
      const point = points[i];
      const nextPoint = i === points.length - 1 ? points[0] : points[i + 1];
      const offsetAngle = Math.PI / 8 * 4;
      const angle = point.angle + offsetAngle;
      const nextAngle = nextPoint.angle + offsetAngle;
      const cxA = Math.cos(angle) * point.lengthB;
      const cyA = Math.sin(angle) * point.lengthB;
      const cxB = Math.cos(nextAngle) * nextPoint.lengthA;
      const cyB = Math.sin(nextAngle) * nextPoint.lengthA;

      path += `M ${point.x} ${point.y} `;
      path += `C ${cxA} ${cyA} `;
      path += `${cxB} ${cyB} `;
      path += `${nextPoint.x} ${nextPoint.y} `;

      // path += `l ${point.x} ${point.y}`;
    }
    return path;
  }

  render() {
    const { title, content, maskAnchors, maskOffset } = this.props;
    const maskPath = this.transformPointsToPath({ points: maskAnchors, offset: maskOffset });

    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="350" height="400" style={{background: '#1111'}}>
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x="0" y="0" width="200" height="100" />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="200" height="100" />
        <path d={maskPath} fill="#ff00ff" transform="translate(150, 150)"/>
        {/* <circle cx="100" cy="100" r="100" clipPath="url(#cut-off-bottom)" /> */}
        <foreignObject x="0" y="0" width="300" height="300">
          <h2 className="ScopeContent-title" >{title}</h2>
          <div className="ScopeContent-content" x="0" y="80" width="200">{content}</div>
        </foreignObject>
      </svg>
    );
  }
}

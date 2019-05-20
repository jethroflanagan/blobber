import React, { Component } from 'react'
import { WobblyController } from 'src/components/wobbly-controller/WobblyController'
import "./Page.scss";

export class Page extends Component {
  wobblyController = null;

  componentDidMount() {
  }

  createWobblyLines({ containerEl, contentEl }) {
    this.wobblyController = new WobblyController({ containerEl, contentEl });
  }

  render() {
    return (
      <div className="Page">
      </div>
    )
  }
}

export function wobblyLineProps ({ color }) {
  return { color, 'data-color': color };
}

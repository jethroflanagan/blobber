import React, { Component } from 'react';
import _map from 'lodash/map';
import * as pixi from 'pixi.js'

import { Blobber } from './components/Blobber';
import './App.scss';

class App extends Component {
  app = null;
  constructor() {
    super();
    this.app = new pixi.Application({
      width: 800,
      height: 800,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x490924,
    });
  }

  componentDidMount() {
    document.body.appendChild(this.app.view);
  }

  render() {
    const circles = [
      { color: 0x500A28, radius: 290, label: 'Our world' },
      { color: 0x640032, radius: 220, label: 'Our communities' },
      { color: 0x870A3C, radius: 160, label: 'Absa as a whole' },
      { color: 0xAF144B, radius: 110, label: 'Your vertical' },
      { color: 0xF0325A, radius: 60, label: 'Your team' },
      { color: 0xF05A7D, radius: 30, label: 'You' },
  ];

    return (
      <div className="App">
        {_map(circles, (circle, i) => <Blobber app={this.app} color={circle.color} radius={circle.radius} x={200} y={200} key={i} label={circle.label} />)}
      </div>
    );
  }
}

export default App;

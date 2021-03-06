import React, { Component } from 'react';
import "./App.scss";
import Menu from './components/menu/Menu';
import { RationalePage } from './pages/rationale/RationalePage';
import { ScopePage } from './pages/scope/ScopePage';
import { Why2Page } from './pages/why2/Why2Page';
import { pages } from './config';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <aside className="App-menu">
          <Menu pages={pages} />
        </aside>
        <content className="App-content">
          {/* <RationalePage />
          <ScopePage /> */}
          <Why2Page />
        </content>
      </div>
    )
  }
}

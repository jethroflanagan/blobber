import React, { Component } from 'react';
import "./App.scss";
import Menu from './components/menu/Menu';
import { RationalePage } from './pages/rationale/RationalePage';
import { ScopePage } from './pages/scope/ScopePage';
import { Why2Page } from './pages/why2/Why2Page';
import { Why3Page } from './pages/why3/Why3Page';
import { pages } from './config';
import { How1Page } from './pages/how1/How1Page';
import { How2Page } from './pages/how2/How2Page';
import { How3Page } from './pages/how3/How3Page';
import { How4Page } from './pages/how4/How4Page';
import { CaseStudies1Page } from './pages/case-studies1/CaseStudies1Page';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <aside className="App-menu">
          <Menu pages={pages} />
        </aside>
        <content className="App-content">
          <RationalePage />
          <Why2Page />
          <Why3Page />
          {/* <ScopePage /> */}
          <How1Page />
          <How2Page />
          <How3Page />
          <How4Page />
          <CaseStudies1Page />
        </content>
      </div>
    )
  }
}

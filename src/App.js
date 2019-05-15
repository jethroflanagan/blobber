import React, { Component } from 'react';
import _map from 'lodash/map';
import "./App.scss";
import Menu from './components/menu/Menu';
import { menu } from './config';
import { WobblyController } from './components/wobbly-controller/WobblyController'

export class App extends Component {
  wobblyLineApp = null;
  wobblyLineContainer = null;
  list = null
  containerLayer = null;
  lineLayer = null;

  createWobblyController() {
    const wobblyController = new WobblyController({ containerEl: this.refs.wobblyLines, contentEl: this.refs.content });
  }

  addPages() {
    const refs = [];
    const pages = _map(menu, group => {
      return _map(group.children, (page, i) => {
        const Component = page.component;
        let ref = '';
        if (i === 0) {
          ref = `page-${group.id}`;
          refs.push({ ref: ref, id: group.id });
        }
        return <div key={i} className={ref} data-color={page.color}><Component /></div>
      });
    });
    return { pages, refs };
  }

  componentDidMount() {
    this.createWobblyController();
  }

  render() {
    const list = this.addPages();
    return (
      <div className="App">
        <aside className="App-menu">
          <Menu list={menu} listRefs={list.refs} />
        </aside>
        <content className="App-content" ref="content">
          {list.pages}
        </content>
        <div className="App-lines" ref="wobblyLines"></div>
      </div>
    )
  }
}

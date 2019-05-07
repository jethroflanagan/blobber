import React, { Component } from 'react';
import _map from 'lodash/map';
import "./App.scss";
import Menu from './components/menu/Menu';
import { menu } from './config';

export class App extends Component {
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
        return <div key={i} className={ref}><Component /></div>
      });
    });
    return { pages, refs };
  }

  render() {
    const list = this.addPages();
    return (
      <div className="App">
        <aside className="App-menu">
          <Menu list={menu} listRefs={list.refs} />
        </aside>
        <content className="App-content">
          {list.pages}
        </content>
      </div>
    )
  }
}

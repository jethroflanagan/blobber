import React, { Component } from 'react';
import _map from 'lodash/map';
import "./App.scss";
import Menu from './components/menu/Menu';
import { Router } from "@reach/router"
import { WhyPage } from './pages/why/WhyPage';
import { menu } from './config';
// import { WobblyController } from './components/wobbly-controller/WobblyController'

export class App extends Component {
  // wobblyLineApp = null;
  // wobblyLineContainer = null;
  list = null
  containerLayer = null;
  lineLayer = null;

  // createWobblyController() {
  //   // const wobblyController = new WobblyController({ containerEl: this.refs.wobblyLines, contentEl: this.refs.content });
  // }

  componentDidMount() {
    // this.createWobblyController();
  }

  createRoutes() {
    return _map(menu, page => {
      const Component = page.component;
      const Container = () => <Component color={page.color}/>;
      return <Container path={page.url || page.id} key={page.id} />
    });
  }

  render() {
    const routes = this.createRoutes();
    return (
      <div className="App">
        {/* <aside className="App-menu">
          app menu placeholder
        </aside> */}
        <content className="App-content" ref="content">
          <Router>
            {routes}
          </Router>
        </content>
        {/* <div className="App-lines" ref="wobblyLines"></div> */}

      </div>
    )
  }
}

import React, { Component } from 'react'
import './Menu.scss';
import ReactSVG from 'react-svg';
import _map from 'lodash/map';
import MenuItem from './MenuItem';

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      active: 0,
    };
  }

  setActive(id) {
    this.setState({ active: id });
  }

  createMenu() {
    const { active } = this.state;
    return _map(this.props.pages, (page, i) => {
      return (
        <div  onClick={e => this.setActive(i)} key={i}>
          <MenuItem label={page.label} key={page.label} isActive={i === active}/>
        </div>
      );
    });
  }

  render() {
    const items = this.createMenu();
    return (
      <div className="Menu">
        <div className="Menu-logo">
          <ReactSVG src="./assets/menu/absa-logo.svg" />
        </div>
        <div className="Menu-items">
          {items}
        </div>
      </div>
    )
  }
}

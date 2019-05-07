import anime from 'animejs';
import _map from 'lodash/map';
import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import _find from 'lodash/find';
import './Menu.scss';
import MenuItem from './MenuItem';
import { clamp } from '../../utils/math';

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      active: 0,
    };
  }

  componentDidMount() {
    this.setState({
      contentEl: document.querySelector('.App-content'),
    });
  }

  setActive(id) {
    const target = _find(this.props.listRefs, { id });
    if (target) {
      const { contentEl } = this.state;
      const el = document.querySelector('.' + target.ref);
      const scroll = { position: contentEl.scrollTop };
      const scrollDiff = Math.abs(scroll.position - el.offsetTop);
      let scrollMultiplier = clamp(scrollDiff / contentEl.scrollHeight, .2, 1);
      anime({
        targets: scroll,
        position: el.offsetTop,
        duration: 1000 * scrollMultiplier,
        easing: 'easeInOutSine',
        update: (anim) => {
          contentEl.scrollTo(0, scroll.position);
        }
      });
    }
    // console.log (this.props.listRefs, id, target)
    this.setState({ active: id });
  }

  createMenu() {
    const { active } = this.state;
    return _map(this.props.list, (item, i) => {
      return (
        <div onClick={e => this.setActive(item.id)} key={i}>
          <MenuItem label={item.label} key={item.label} isActive={i === active} />
        </div>
      );
    });
  }

  render() {
    const list = this.createMenu();
    return (
      <div className="Menu">
        <div className="Menu-logo">
          <ReactSVG src="./assets/menu/absa-logo.svg" />
        </div>
        <div className="Menu-items">
          {list}
        </div>
      </div>
    )
  }
}

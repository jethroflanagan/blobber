import React, { Component } from 'react';
import { wobblyLineProps } from 'src/pages/slide';
import _map from 'lodash/map';
import './ResourcesSlide1.scss';
import ResourceCard from '../resource-card/ResourceCard';

export class ResourcesSlide1 extends Component {
  componentDidMount() {
  }

  createCards() {
    return _map([1, 2, 3, 4, 5], (card, i) => <ResourceCard key={i} />);
  }

  render() {
    const cards = this.createCards();
    return (
      <div className="ResourceSlide1" {...wobblyLineProps(this.props)}>
        <div className="Page-slide">
          <div className="Page-content">
            <div className="ResourcesSlide1-cards">
              {cards}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

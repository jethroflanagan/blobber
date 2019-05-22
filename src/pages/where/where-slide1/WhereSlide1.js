import React, { Component } from 'react';
import './WhereSlide1.scss';
import ReactSVG from 'react-svg';
import { wobblyLineProps } from 'src/pages/slide';

export class WhereSlide1 extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="WhereSlide1" { ...wobblyLineProps({ color: this.props.color }) }>
        <div className="Page-slide">
          <div className="Page-content">
            <p><b>Where can you use design thinking?</b></p>

            <p>At all scales, and in most businesses, design thinking helps teams build better products faster.</p>
            <p><b>It's an iterative human-centred approach to problem solving.</b></p>
          </div>
          <div className="Page-image">
            <ReactSVG src="./assets/where/rocket-placeholder.svg" />
          </div>
        </div>
      </div>
    )
  }
}

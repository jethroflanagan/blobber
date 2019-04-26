import React, { Component } from 'react';
import './RationalePage.scss';
import Gyro from './gyro/Gyro';

export class RationalePage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Rationale">
        <div className="Rationale-gyro">
          <Gyro />
        </div>
      </div>
    );
  }
}

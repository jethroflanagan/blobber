import React, { Component } from 'react'
import { Button } from 'src/components/button/Button';
import "./ResourceCard.scss";

export default class ResourceCard extends Component {
  render() {
    const {color} = this.props;
    return (
      <div className="ResourceCard">
        <div className="ResourceCard-title">Take on the Design<br/>Sprint Challenge</div>
        <div className="ResourceCard-content">Check all the steps there are only like 4, you'll be fine.</div>
        <Button icon="./assets/download-icon.svg" color={color}>Download file</Button>
        <div className="ResourceCard-content">Check all the steps there are only like 4, you'll be fine.</div>
        <Button icon="./assets/link-icon.svg" transparent color={color}>Go to the site</Button>
      </div>
    )
  }
}

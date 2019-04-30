import React, { Component } from 'react';
import * as pixi from 'pixi.js';
import _map from 'lodash/map';
import { Blobber } from 'src/components/blobber/Blobber';
import "./List.scss";

const BULLET_SIZE = 30;

export class List extends Component {
  blobs = [];
  // createList(list) {
  //   _map(list, item => {
  //     return (
  //       <li>{item}</li>
  //     );
  //   });
  // }


  constructor() {
    super();
  }

  componentDidMount() {
    // const app = new pixi.Application({
    //   width: BULLET_SIZE,
    //   height: BULLET_SIZE,
    // });
    // app.background = 0xff000000;
    // const el = this.refs.list;
    // el.appendChild(this.app.view);
    // console.log(this.blobs[0])
    // this.refs.list.appendChild(this.blobs[0].getCanvas());
  }

  createBlobs() {
    // const blobber = <Blobber radius={10} x={BULLET_SIZE/2} y={BULLET_SIZE/2} color={0xffffff} backgroundColor={0xff0000}/>
    // this.blobs.push(blobber);
    // return (
    //   blobber
    // );
  }

  render() {
    const blobs = this.createBlobs();
    return (
      <div className="List">
        <ol ref="list">
          {this.props.children}
        </ol>
        {blobs}
      </div>
    )
  }
}

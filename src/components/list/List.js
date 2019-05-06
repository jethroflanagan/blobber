import React, { Component } from 'react';
import * as pixi from 'pixi.js';
import _map from 'lodash/map';
import { Blobber } from 'src/components/blobber/Blobber';
import "./List.scss";

const BULLET_SIZE = 28;
const BULLET_SPACING = 44;
const BLOB_OFFSET = (BULLET_SPACING - BULLET_SIZE) / 2;
const BLOB_IDLE_DISTORTION = .3;
const BLOB_PADDING = BLOB_IDLE_DISTORTION * BULLET_SIZE;

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
    this.createBlobs();

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
    for (let i = 0; i < this.props.children.length; i++) {
      const width = BULLET_SIZE + BLOB_PADDING * 2;
      const height = BULLET_SIZE + BLOB_PADDING * 2;
      const x = width / 2;
      const y = height / 2;
      const radius = BULLET_SIZE / 2;
      const blob = new Blobber({ alpha: .2, color: 0x000000, x, y, radius, idleDistortion: BLOB_IDLE_DISTORTION });

      blob.createCanvas({ transparent: true, width, height });
      // blob.createCanvas({ backgroundColor: 0x0000ff, width, height });

      const container = document.createElement('div');
      container.className = 'List-blobsItem';
      container.style.top = `${(BULLET_SPACING) * i + 2}px`;
      container.style.left = `${-1}px`;

      blob.attachToElement(container);
      this.refs.blobs.appendChild(container);
    }

  }

  render() {
    return (
      <div className="List">
        <ol>
          {this.props.children}
        </ol>
        <div className="List-blobs" ref="blobs" style={{ left: `-${BLOB_PADDING}px`, top: `-${BLOB_PADDING}px` }} />
      </div>
    )
  }
}

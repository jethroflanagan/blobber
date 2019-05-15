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
      const blob = new Blobber({ alpha: .4, color: 0xffffff, x, y, radius, idleDistortion: BLOB_IDLE_DISTORTION });

      blob.createCanvas({ transparent: true, width, height });

      const container = document.createElement('div');
      container.className = 'List-blobsItem';
      container.style.top = `${(BULLET_SPACING) * i - 1}px`;
      container.style.left = `${-4}px`;

      blob.attachToElement(container);
      this.refs.blobs.appendChild(container);

      blob.startWobbling({
        wobble: {
            position: () => ({ min: -3, max: 3 }),
            length: (length) => ({ min: length * .8, max: length * 1.2 }),
            angle: (angle) => ({ min: -Math.PI / 20, max: Math.PI / 20 }),
        },
        timeRange: { min: 1700, max: 3500 },
      });
    }

  }

  render() {
    const { color } = this.props;
    return (
      <div className="List">
        {/* <style dangerouslySetInnerHTML={{
          __html: [
            '.List ol li:before {',
            `  color: ${color}`,
            '}'
            ].join('\n')
          }}>
        </style> */}
        <ol ref="list">
          {this.props.children}
        </ol>
        <div className="List-blobs" ref="blobs" style={{ left: `-${BLOB_PADDING}px`, top: `-${BLOB_PADDING}px` }} />
      </div>
    )
  }
}

import React, { Component } from 'react';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import { WobblyController } from 'src/components/wobbly-controller/WobblyController';
import { PageFooter } from '../components/page-footer/PageFooter';
import { PageHeader } from '../components/page-header/PageHeader';
import "./Page.scss";

export class Page extends Component {
  wobblyController = null;

  componentDidMount() {
  }

  createWobblyLines({ containerEl = null, contentEl = null } = {}) {
    this.wobblyController = new WobblyController({
      containerEl: containerEl || this.refs.wobblyLines,
      contentEl: contentEl || this.refs.content
    });
  }

  createPage({ lead, title, slides, backUrl, nextUrl }) {
    const color = this.props.color;
    return (
      <div>
        <div className="Page-wobbles" ref="wobblyLines"></div>
        <div className="Page Why" ref="content">
          <PageHeader lead={lead} title={title} color={color}/>
          <NavigationArrow color={color} direction="back" url={backUrl} />
          {slides}
          <NavigationArrow color={color} direction="next" url={nextUrl} />
          <PageFooter color={color} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Page">
      </div>
    )
  }
}

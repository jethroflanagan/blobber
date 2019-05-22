import React from 'react';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import { PageHeader } from 'src/components/page-header/PageHeader';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { WhereSlide1 } from './where-slide1/WhereSlide1';
import { WhereSlide2 } from './where-slide2/WhereSlide2';
import './WherePage.scss';

export class WherePage extends Page {
  constructor() {
    super();
  }

  componentDidMount() {
    this.createWobblyLines({ containerEl: this.refs.wobblyLines, contentEl: this.refs.content });
  }

  render() {
    const { color } = this.props;

    return (
      <div>
        <div className="Page-wobbles" ref="wobblyLines"></div>
        <div className="Page" ref="content">
          <PageHeader lead="Put It" title="Into Practice" color={color}/>
          <NavigationArrow color={color} direction="back" url="/why" />
          <WhereSlide1 color={SLIDE_COLOR_DARK} />
          <WhereSlide2 color={SLIDE_COLOR_MEDIUM} />
          <NavigationArrow color={color} direction="next" url="/how" />
        </div>
      </div>
    );
  }
}

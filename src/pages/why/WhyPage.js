import React from 'react';
import { NavigationArrow } from 'src/components/navigation-arrow/NavigationArrow';
import { PageHeader } from 'src/components/page-header/PageHeader';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import './WhyPage.scss';

export class WhyPage extends Page {
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
        <div className="Page Why" ref="content">
          <PageHeader lead="Understanding" title="The Problem" color={color}/>
          <NavigationArrow color={color} direction="back" url="/" />
          <WhySlide1 color={SLIDE_COLOR_DARK} />
          <WhySlide2 color={SLIDE_COLOR_MEDIUM} />
          <WhySlide3 color={SLIDE_COLOR_DARK} />
          <NavigationArrow color={color} direction="next" url="/where" />
          <footer className="App-footer" data-color={color}>
            <a href="mailto:designthinking@absa.co.za">designthinking@absa.co.za</a> <a href="">Contact us</a> <a href="">Resources</a>
          </footer>
        </div>
      </div>
    );
  }
}

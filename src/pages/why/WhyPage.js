import React from 'react';
import { Page } from 'src/pages/Page';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import './WhyPage.scss';
import ReactSVG from 'react-svg';
import PageHeader from 'src/components/page-header/PageHeader';
import { WobblyContent } from 'src/pages/WobblyContent';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from '../Page';

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
          <WhySlide1 color={SLIDE_COLOR_DARK} />
          <WhySlide2 color={SLIDE_COLOR_MEDIUM} />
          <WhySlide3 color={SLIDE_COLOR_DARK} />
        </div>
      </div>
    );
  }
}

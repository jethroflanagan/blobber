import React from 'react';
import { Page } from 'src/pages/Page';
import { WhySlide1 } from './why-slide1/WhySlide1';
import { WhySlide2 } from './why-slide2/WhySlide2';
import { WhySlide3 } from './why-slide3/WhySlide3';
import './WhyPage.scss';
import ReactSVG from 'react-svg';
import PageHeader from '../../components/page-header/PageHeader';

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
        <div className="Page Why" ref="content">
          <PageHeader lead="Understanding" title="The Problem" color={color} data-color={0xff0000}/>
          <WhySlide1 color={0xff0000} />
          <WhySlide2 />
          <WhySlide3 />
        </div>
        <div className="Page-wobbles" ref="wobblyLines"></div>
      </div>
    );
  }
}

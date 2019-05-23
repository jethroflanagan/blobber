import React from 'react';
import { Page } from 'src/pages/Page';
import { SLIDE_COLOR_DARK, SLIDE_COLOR_MEDIUM } from 'src/pages/slide';
import { ResourcesSlide1 } from './resources-slide1/ResourcesSlide1';

import './ResourcesPage.scss';

export class ResourcesPage extends Page {
  render() {
    return (
      this.createPage({
        lead: 'Find more',
        title: 'Useful things',
        slides: <>
          <ResourcesSlide1 color={0x870A3C} />
        </>,
      })
    );
  }
}

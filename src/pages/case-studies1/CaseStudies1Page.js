
import React from 'react';
import { Page } from '../Page';
import './CaseStudies1Page.scss';

export class CaseStudies1Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page Studies1">
        <div className="Page-content">
          <h2 className="Page-title">Case Studies</h2>
          <div className="Page-columns">
            <p>Vivamus placerat leo sit amet turpis accumsan pharetra. Etiam commodo est a fermentum euismod. Suspendisse sem sem, luctus eget massa vitae, congue mollis risus.</p>
            <p>Vivamus in turpis sed risus elementum rutrum. Duis nec erat lorem. Praesent non mi non lacus tincidunt molestie non sed odio. Integer cursus feugiat augue, at cursus lacus vehicula id. Phasellus dapibus dui enim, eu auctor ipsum vehicula vitae. Morbi nec ornare ex, in molestie velit.</p>
            <p>Nam sagittis leo at blandit maximus. Nullam congue eget risus convallis scelerisque. </p>
          </div>
        </div>
        <div className="Page-image Studies1-image">
        </div>
      </div>
    );
  }
}

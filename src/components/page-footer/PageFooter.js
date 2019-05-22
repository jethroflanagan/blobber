import React, { Component } from 'react'
import { wobblyLineProps } from 'src/pages/slide';
import "./PageFooter.scss";

export class PageFooter extends Component {
  render() {
    return (
      <footer className="PageFooter" {...wobblyLineProps(this.props)}>
        <a href="mailto:designthinking@absa.co.za">designthinking@absa.co.za</a> <a href="">Contact us</a> <a href="">Resources</a>
      </footer>
    )
  }
}

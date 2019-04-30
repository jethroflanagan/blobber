import React, { Component } from 'react'
import { Page } from '../Page';
import './Why2Page.scss';
import { List } from 'src/components/list/List';

export class Why2Page extends Page {
  componentDidMount() {
  }

  render() {
    return (
      <div className="Page Why2">
        <div className="Page-image">
        </div>
        <div className="Page-content">
          <p>According to the World Economic Forum there are <b>10 skills</b> that are <b>crucial to success</b> in our ever-changing digitally-driven business environment:</p>
          <List>
            <li>Complex Problem Solving</li>
            <li>Critical Thinking</li>
            <li>Creativity</li>
            <li>People Management</li>
            <li>Co-ordination with others</li>
            <li>Emotional Intelligence - Empathy</li>
            <li>Judgement and Decisions</li>
            <li>Service orientation</li>
            <li>Negotiations</li>
            <li>Cognitive Flexibility</li>
          </List>
        </div>
      </div>
    )
  }
}

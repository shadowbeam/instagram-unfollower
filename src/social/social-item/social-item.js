import React, { Component } from 'react';
import './social-item.less';
import './social-item.model.js';

export default class SocialItem extends Component {

  socialItem: SocialItem;

  constructor(props){
    super();
    this.socialItem = props.value;
  }

  render() {
    return (
      <a href={this.socialItem.url}>
        <div className="icon">
        			<i className={`fa fa-${this.socialItem.icon}`} aria-hidden="true"></i>
        </div>
      </a>
  )}
}

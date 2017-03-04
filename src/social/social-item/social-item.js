import React, { Component } from 'react';
import './social-item.less';
import './social-item.model.js';

export default class SocialItem extends Component {

  socialItem: SocialItem;
  hover:boolean;
  hex:string = "";

  constructor(props){
    super(props);
    this.socialItem = props.value;
    this.enableHover = this.enableHover.bind(this);
    this.disableHover = this.disableHover.bind(this);
  }

  enableHover(){
    this.hover = true;
    this.hex = this.socialItem.hex;
    this.forceUpdate();
  }

  disableHover(){
    this.hex = "";
    this.forceUpdate();
  }

  render() {
    return (
      <a href={this.socialItem.url}>
        <div  className={`icon ${this.hover ? 'hover' : ''}`}
              style={{backgroundColor: this.hex}}
              onMouseEnter={this.enableHover}
              onMouseLeave={this.disableHover}>
        			<i className={`fa fa-${this.socialItem.icon}`} aria-hidden="true"></i>
        </div>
      </a>
  )}
}

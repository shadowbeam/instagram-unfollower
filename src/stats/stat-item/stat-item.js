import React, { Component } from 'react';
import './stat-item.less';


export default class StatItem extends Component {

  statItem: StatItem;

  constructor(props){
    super(props);
    this.statItem = props.statItem;
  }

  render() {
    return (
        <div className={`stat-item level-${this.statItem.level}`}>
        <i className={`fa fa-${this.statItem.icon}`} aria-hidden="true"></i>

        </div>
      )}
}

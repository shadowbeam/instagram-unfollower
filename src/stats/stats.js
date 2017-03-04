import React, { Component } from 'react';
import StatItemComponent from './stat-item/stat-item.js';
import StatItem from './stat-item/stat-item.model.js';
import './stats.less';


export default class Stats extends Component {

  social = [
    new StatItem("camera-retro", "api", 0),
    new StatItem("diamond", "api", 1),
    new StatItem("coffee", "api", 2),
    new StatItem("soccer-ball-o", "api", 2)
   ];


  render() {
    return (
        <div className='stats'>
        {this.social.map((socialItem) =>
          <StatItemComponent statItem={socialItem}/>)
        }

        </div>
      )}
}

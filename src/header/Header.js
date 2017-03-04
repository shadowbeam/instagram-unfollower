import React, { Component } from 'react';
import logo from './logo.svg';
import './header.less';

export default class Header extends Component {
  render() {
    return (
        <div className='header'>
         <span className='line-1'>Allan</span>
         <span className='line-2'>W&lt;tson<span className='dot'>.</span></span>
        </div>
    );
  }
}

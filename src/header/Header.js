import React, { Component } from 'react';
import logo from './logo.svg';
import './header.less';

class Header extends Component {
  render() {
    return (
        <div className='header'>
         <span className='line-1'>Allan</span>
         <span className='line-2'>Watson<span className='dot'>.</span></span>
        
        </div>
    );
  }
}

export default Header;

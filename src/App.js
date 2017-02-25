import React, { Component } from 'react';
import Header from './header/Header.js';
import Social from './social/Social.js';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className='App'>

        <div className='bg right'></div>
        <div className='bg left'></div>

       <Header></Header>
       <Social></Social>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Header } from './components/Header';
import { LeaderBoard } from './components/LeaderBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <LeaderBoard/>
      </div>
    );
  }
}

export default App;

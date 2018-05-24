import React, { Component } from 'react';
import { Header } from './components/Header';
import { LeaderBoard } from './components/LeaderBoard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    }
  }

  componentDidMount() {
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => {
          return {
            leaderboard: prevState.leaderboard.concat(res)
          }
        });
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <div className="App">
          <Header/>
        <LeaderBoard leaderboard={this.state.leaderboard}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Header } from './components/Header';
import { LeaderBoard } from './components/LeaderBoard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
    this.fetchData30 = this.fetchData30.bind(this);
    this.fetchDataAllTime = this.fetchDataAllTime.bind(this);
  }

  fetchData30() {
    this.state.leaderboard = [];
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

  fetchDataAllTime() {
    this.state.leaderboard = [];
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => {
          return {
            leaderboard: prevState.leaderboard.concat(res)
          }
        });
      }).catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData30();
  }

  render() {
    return (
      <div className="App">
          <Header/>
        <LeaderBoard leaderboard={this.state.leaderboard} fetchData30={this.fetchData30} fetchDataAllTime={this.fetchDataAllTime}/>
      </div>
    );
  }
}

export default App;

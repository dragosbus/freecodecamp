import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TextArea />
        <Result/>
      </div>
    );
  }
}

const Header = () => {
  return (
    <header>
      <h1>Markdown Viewer</h1>
    </header>
  );
};

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.typeHandler = this.typeHandler.bind(this);
  }

  typeHandler(e) {

  }

  render() {
    return (
      <textarea name="mark" id="mark"></textarea>
    );
  }
}

const Result = props => {
  return (
    <div className="result">
    
    </div>
  );
};

export default App;

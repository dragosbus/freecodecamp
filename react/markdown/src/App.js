import React, { Component } from 'react';
import marked from 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  typeHandler(t) {
    this.setState({
      text: marked(t)
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <TextArea typeHandler={this.typeHandler}/>
        <Result textContent={this.state.text}/>
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
    this.typeHandler = this.typeHandler.bind(this);
  }

  typeHandler() {
    this.props.typeHandler(this._textValue.value);
  }

  render() {
    return (
      <textarea ref={t=>this._textValue = t} onChange={this.typeHandler} name="mark" id="mark"></textarea>
    );
  }
}

const Result = props => {
  return (
    <div className="result">
      {props.textContent}
    </div>
  );
};

export default App;

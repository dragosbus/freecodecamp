import React, { Component } from 'react';
import { MarkdownPreview } from 'react-marked-markdown';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.typeHandler = this.typeHandler.bind(this);
  }

  typeHandler(t) {
    this.setState({
      text: t
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <TextArea typeHandler={this.typeHandler}/>
        <MarkdownPreview value={this.state.text} />
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

export default App;

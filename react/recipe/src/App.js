import React, { Component } from 'react';
import { Header } from './components/Header';
import { AddRecipeModal } from './components/AddRecipe';
import { AddRecipeBtn } from './components/AddRecipe';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOn: !this.state.modalOn
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <AddRecipeBtn toggleModal={this.toggleModal}/>
        <AddRecipeModal modalOn={this.state.modalOn} toggleModal={this.toggleModal}/>
      </div>
    );
  }
}

export default App;

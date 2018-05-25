import React, { Component } from 'react';
import { Header } from './components/Header';
import { AddRecipeModal } from './components/AddRecipe';
import { AddRecipeBtn } from './components/AddRecipe';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <AddRecipeBtn/>
        <AddRecipeModal/>
      </div>
    );
  }
}

export default App;

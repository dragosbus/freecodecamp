import React, { Component } from 'react';
import { Header } from './components/Header';
import { AddRecipeModal } from './components/AddRecipe';
import { AddRecipeBtn } from './components/AddRecipe';
import { Recipes } from './components/Recipes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      recipes: [],
      id: localStorage.recipes && JSON.parse(localStorage.recipes).length > 0 ? JSON.parse(localStorage.recipes)[JSON.parse(localStorage.recipes).length - 1].id + 1 : 1
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.addRecipeToLocalStorage = this.addRecipeToLocalStorage.bind(this);
  }

  addRecipeToLocalStorage(recipe) {
    if (!localStorage.recipes) {
      localStorage.recipes = JSON.stringify([]);
    }
    let recipesFromLocalStorage = JSON.parse(localStorage.recipes);
    recipesFromLocalStorage.push(recipe);
    localStorage.recipes = JSON.stringify(recipesFromLocalStorage);
  }

  addRecipe(name, ingredients) {
    let ingredientsArr = ingredients.value.split(',');
    let newRecipe = {
      id: this.state.id++,
      name: name.value,
      ingredients: ingredientsArr
    }
    this.addRecipeToLocalStorage(newRecipe);
    this.setState(prevState => {
      return {
        recipes: prevState.recipes.concat(JSON.parse(localStorage.recipes))
      }
    });
  }

  toggleModal() {
    this.setState({
      modalOn: !this.state.modalOn
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Recipes recipes={localStorage.recipes ? JSON.parse(localStorage.recipes) : this.state.recipes}/>
        <AddRecipeBtn toggleModal={this.toggleModal}/>
        <AddRecipeModal modalOn={this.state.modalOn} toggleModal={this.toggleModal} addRecipe={this.addRecipe}/>
      </div>
    );
  }
}

export default App;

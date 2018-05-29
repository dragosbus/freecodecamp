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
    this.showRecipeInfo = this.showRecipeInfo.bind(this);
  }

  addRecipeToLocalStorage(recipe) {
    if (!localStorage.recipes) {
      localStorage.recipes = JSON.stringify([]);
    }
    localStorage.recipes = JSON.stringify(recipe);
  }

  componentWillMount() {
    if (!localStorage.recipes) {
      this.addRecipeToLocalStorage([].concat(this.state.recipes));
    }
    let data = JSON.parse(localStorage.recipes);
    this.addRecipeToLocalStorage(data.concat(this.state.recipes));
  }

  addRecipe(name, ingredients) {
    let ingredientsArr = ingredients.value.split(',');
    let newRecipe = {
      id: this.state.id++,
      name: name.value,
      ingredients: ingredientsArr
    }
    console.log(newRecipe)
    this.setState(prevState => {
      return {
        recipes: prevState.recipes.concat(newRecipe)
      }
    });
    this.addRecipeToLocalStorage(JSON.parse(localStorage.recipes).concat(newRecipe));
  }

  toggleModal() {
    this.setState({
      modalOn: !this.state.modalOn
    });
  }

  showRecipeInfo(e) {
    if (e.target.tagName === 'LI') {
      e.target.querySelector('.info-recipe').classList.toggle("show-info");
    } else if (e.target.tagName === 'H4') {
      e.target.nextSibling.classList.toggle("show-info");
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Recipes data={JSON.parse(localStorage.recipes)} showInfo={this.showRecipeInfo} recipes={localStorage.recipes ? JSON.parse(localStorage.recipes) : this.state.recipes}/>
        <AddRecipeBtn toggleModal={this.toggleModal}/>
        <AddRecipeModal modalOn={this.state.modalOn} toggleModal={this.toggleModal} addRecipe={this.addRecipe}/>
      </div>
    );
  }
}

export default App;

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
      modalForAddOrEdit: 0,
      dataForEdit:'',
      dataForEditId:0,
      id: localStorage.recipes && JSON.parse(localStorage.recipes).length > 0 ? JSON.parse(localStorage.recipes)[JSON.parse(localStorage.recipes).length - 1].id + 1 : 1
    };
    this.toggleModalForAdd = this.toggleModalForAdd.bind(this);
    this.toggleModalForEdit = this.toggleModalForEdit.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.addRecipeToLocalStorage = this.addRecipeToLocalStorage.bind(this);
    this.showRecipeInfo = this.showRecipeInfo.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.getDataForEditId = this.getDataForEditId.bind(this);
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

  componentDidMount() {
    this.setState(prevState=>{
      return {
        recipes: prevState.recipes.concat(JSON.parse(localStorage.recipes))
      }
    });
  }

  addRecipe(name, ingredients) {
    let ingredientsArr = ingredients.value.split(',');
    let newRecipe = {
      id: this.state.id++,
      name: name.value,
      ingredients: ingredientsArr
    }
    this.setState(prevState => {
      return {
        recipes: prevState.recipes.concat(newRecipe)
      }
    });
    this.addRecipeToLocalStorage(JSON.parse(localStorage.recipes).concat(newRecipe));
  }

  toggleModalForAdd() {
    this.setState({
      modalOn: !this.state.modalOn,
      modalForAddOrEdit: 0
    });
  }

  toggleModalForEdit() {
    this.setState({
      modalOn: !this.state.modalOn,
      modalForAddOrEdit: 1
    });
  }

  showRecipeInfo(e) {
    if (e.target.tagName === 'H4') {
      e.target.nextElementSibling.classList.toggle("show-info");
    }
  }

  deleteRecipe(e) {
    let data = JSON.parse(localStorage.recipes);
    let idRecipe = +e.target.parentNode.parentNode.parentNode.id;
    data.splice(idRecipe-1, 1);
    //reset the id in order by index
    for(let i=0;i<data.length;i++) {
      data[i].id = i+1;
    }
    localStorage.recipes = JSON.stringify(data);

    this.setState({
      recipes: localStorage.recipes
    });
  }

  getDataForEditId(e) {
    this.toggleModalForEdit();
    let idClicked = +e.target.parentNode.parentNode.parentNode.id;
    let dataForEdit = this.state.recipes[idClicked-1]
    this.setState({
      dataForEdit: dataForEdit,
      dataForEditId: idClicked-1
    });
  }

  editRecipe(e) {
    this.toggleModalForEdit();
     
    let name = document.getElementById('recipe-name');
    let ingredients = document.getElementById('ingredients');
    this.state.dataForEdit.name = name.value;
    this.state.dataForEdit.ingredients = ingredients.value.split(',');
    this.state.recipes.splice(this.state.dataForEditId, 0);
    console.log(this.state.recipes);
    this.addRecipeToLocalStorage(this.state.recipes)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Recipes data={JSON.parse(localStorage.recipes)} showInfo={this.showRecipeInfo} recipes={localStorage.recipes ? JSON.parse(localStorage.recipes) : this.state.recipes} deleteRecipe={this.deleteRecipe} editRecipe={this.getDataForEditId}/>
        <AddRecipeBtn toggleModal={this.toggleModalForAdd}/>
        <AddRecipeModal modalOn={this.state.modalOn} toggleModal={this.toggleModalForEdit} addRecipe={this.addRecipe} whichModal={this.state.modalForAddOrEdit} editRecipe={this.editRecipe}/>
      </div>
    );
  }
}

export default App;

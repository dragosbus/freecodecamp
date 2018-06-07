import React, { Component } from 'react';


export const AddRecipeBtn = props => {
    return (
        <button onClick={props.toggleModal} className="btn primary">Add Recipe</button>
    );  
};

export class AddRecipeModal extends Component {

    addRecipe() {
        this.props.addRecipe(this._name, this._ingredients);
    }

    render() {
        return (
            <div className="overlay" style={{ display: this.props.modalOn ? "block" : "none" }}>
                <div className="modal">
                    <div className="modal-header">
                        <h3>{this.props.whichModal ? "Edit Recipe" : "Add Recipe"}</h3>
                        <button onClick={this.props.toggleModal} className="close-modal">x</button>
                    </div>
                    <div className="body-modal">
                        <div>
                            <label htmlFor="recipe-name">Recipe</label>
                            <input type="text" id="recipe-name" placeholder="Recipe Name" ref={name=>this._name = name}/>
                        </div>
                        <div>
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea id="ingredients" placeholder="Enter Ingredients, Separated by Commas" ref={ingr=>this._ingredients=ingr}></textarea>
                        </div>
                    </div>
                    <div className="footer-modal">
                        <button className="btn" onClick={this.props.whichModal ? this.props.editRecipe:this.addRecipe.bind(this)}>{this.props.whichModal ? "Edit Recipe" : "Add Recipe"}</button>
                        <button onClick={this.props.toggleModal} className="btn">Close</button>
                    </div>
                </div>
            </div>
        );
    }
} 


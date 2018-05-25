import React, { Component } from 'react';


export const AddRecipeBtn = props => {
    return (
        <button className="btn primary">Add Recipe</button>
    );  
};

export class AddRecipeModal extends Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-header">
                    <h3>Add Recipe</h3>
                    <button className="close-modal">x</button>
                </div>
                <div className="body-modal">
                    <div>
                        <label htmlFor="recipe-name">Recipe</label>
                        <input type="text" id="recipe-name" placeholder="Recipe Name" />
                    </div>
                    <div>
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea id="Ingredients" placeholder="Enter Ingredients, Separated by Commas"></textarea>
                    </div>
                </div>
                <div className="footer-modal">
                    <button className="btn">Add Recipe</button>
                    <button className="btn">Close</button>
                </div>
            </div>
        );
    }
} 


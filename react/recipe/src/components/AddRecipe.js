import React, { Component } from 'react';


export const AddRecipeBtn = props => {
    return (
        <button onClick={props.toggleModal} className="btn primary">Add Recipe</button>
    );  
};

export class AddRecipeModal extends Component {
    render() {
        return (
            <div className="modal" style={{display: this.props.modalOn ? "block" : "none"}}>
                <div className="modal-header">
                    <h3>Add Recipe</h3>
                    <button onClick={this.props.toggleModal} className="close-modal">x</button>
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
                    <button onClick={this.props.toggleModal} className="btn">Close</button>
                </div>
            </div>
        );
    }
} 


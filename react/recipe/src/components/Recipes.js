import React from 'react';


export const Recipes = props => {
    return (
        <ul className="recipes">
            {props.recipes.map((r, i) => <Recipe showInfo={props.showInfo} key={i} name={r.name} data={props.data[i]}/>)}
        </ul>
    );
};

const Recipe = props => {
    return (
        <li onClick={props.showInfo} className="recipe">
            <h4>{props.name}</h4>
            <div className="info-recipe">
                <h3>Ingredients</h3>
                <Ingredients data={props.data} />
                <div className="recipe-actions">
                    <button className="btn delete">Delete</button>
                    <button className="btn edit">Edit</button>
                </div>
            </div>
        </li>
    );  
};

const Ingredients = props => {
    return (
        <ul>
            {props.data.ingredients.map((ingr, i) => <li key={i}>{ingr}</li>)}
        </ul>
    );  
};
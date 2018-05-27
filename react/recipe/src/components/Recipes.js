import React from 'react';


export const Recipes = props => {
    return (
        <ul className="recipes">
            {props.recipes.map((r, i) => <Recipe showInfo={props.showInfo} key={i} name={r.name}/>)}
        </ul>
    );
};

const Recipe = props => {
    return (
        <li onClick={props.showInfo} className="recipe">
            <h4>{props.name}</h4>
            <div className="info-recipe">
                <h3>Ingredients</h3>
                <ul></ul>
            </div>
        </li>
    );  
};
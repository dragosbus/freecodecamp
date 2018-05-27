import React from 'react';


export const Recipes = props => {
    return (
        <ul className="recipes">
            {props.recipes.map((r, i) => <Recipe key={i} name={r.name}/>)}
        </ul>
    );
};

const Recipe = props => {
    return (
        <li className="recipes">{props.name}</li>
    );  
};
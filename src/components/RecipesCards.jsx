import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../Pages/Recipes.module.css';

const START_MAX_INDEX = 11;

function RecipesCards() {
  const { location: { pathname } } = useHistory();
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(START_MAX_INDEX);
  const recipes = useSelector((state) => state.recipes.array);

  return (
    recipes.reduce((recipesToShow, recipe, index) => {
      if (index >= minIndex && index <= maxIndex) {
        return [...recipesToShow, (
          <li
            className={ styles.recipe_card }
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <img
              src={
                recipe[(pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb')]
              }
              alt=""
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {recipe[(pathname === '/meals' ? 'strMeal' : 'strDrink')]}
            </p>
          </li>
        )];
      } return recipesToShow;
    }, [])
  );
}

export default RecipesCards;

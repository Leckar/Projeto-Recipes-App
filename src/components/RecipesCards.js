import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link, withRouter } from 'react-router-dom';
import styles from '../Pages/Recipes.module.css';

const START_MAX_INDEX = 11;

function RecipesCards() {
  const { location: { pathname } } = useHistory();
  const recipes = useSelector((state) => state.recipes.array);

  return (
    recipes.reduce((recipesToShow, recipe, index) => {
      if (index >= 0 && index <= START_MAX_INDEX) {
        return [...recipesToShow, (
          <li
            className={ styles.recipe_card }
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link
              to={ `${pathname}/${
                pathname === '/meals' ? recipe.idMeal : recipe.idDrink}` }
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
            </Link>
          </li>
        )];
      } return recipesToShow;
    }, [])
  );
}

export default withRouter(RecipesCards);

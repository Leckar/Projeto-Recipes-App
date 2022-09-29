import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favoriteRecipeStorage);
  }, []);

  console.log(favoriteRecipes);

  return (
    <main>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Meal
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drink
        </button>
      </section>
      <section>
        <ul>
          { favoriteRecipes.map((recipe, index) => (
            <li key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt=""
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt=""
                />
              </button>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ favoritedIcon }
                  alt=""
                />
              </button>
            </li>
          )) }
        </ul>
      </section>
    </main>
  );
}

export default FavoriteRecipes;

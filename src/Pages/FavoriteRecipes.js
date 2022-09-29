import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favoriteRecipeStorage);
    setLinkCopied('');
  }, []);

  const handleShare = (id, type) => {
    const url = `${window.location.origin}/${type}s/${id}`;
    setLinkCopied(id);
    copy(url);
  };

  const handleUnfavorite = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

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
              <span data-testid={ `${index}-horizontal-name` }>{ recipe.name }</span>
              <span data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
                { recipe.type === 'drink' && <p>{ recipe.alcoholicOrNot }</p> }
              </span>
              <button
                type="button"
                onClick={ () => handleShare(recipe.id, recipe.type) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt=""
                />
              </button>
              { linkCopied === recipe.id && <p>Link copied!</p> }
              <button
                type="button"
                onClick={ () => handleUnfavorite(recipe.id) }
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

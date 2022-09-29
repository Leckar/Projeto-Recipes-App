import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import styles from './FavoriteRecipes.module.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesToShow, setFavoriteRecipesToShow] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favoriteRecipeStorage);
    setFavoriteRecipesToShow(favoriteRecipeStorage);
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
    setFavoriteRecipesToShow(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  const handleFilter = (type) => {
    if (type) {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === type);
      setFavoriteRecipesToShow(filteredRecipes);
    } else setFavoriteRecipesToShow(favoriteRecipes);
  };

  return (
    <main>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleFilter() }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => handleFilter('meal') }
        >
          Meal
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleFilter('drink') }
        >
          Drink
        </button>
      </section>
      <section>
        <ul>
          { favoriteRecipesToShow.map((recipe, index) => (
            <li key={ index }>
              <Link to={ `../${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt=""
                  className={ styles.favorite_image }
                />
                <span data-testid={ `${index}-horizontal-name` }>{ recipe.name }</span>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.nationality} - ${recipe.category}` }
                  { recipe.type === 'drink' && <p>{ recipe.alcoholicOrNot }</p> }
                </span>
              </Link>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import styles from './FavoriteRecipes.module.css';
import allRecipesIcon from '../images/AllRecipesIcon.svg';
import allMealsIcon from '../images/allMealsIcon.svg';
import allDrinksIcon from '../images/allDrinksIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesToShow, setFavoriteRecipesToShow] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipeStorage) {
      setFavoriteRecipes(favoriteRecipeStorage);
      setFavoriteRecipesToShow(favoriteRecipeStorage);
      setLinkCopied('');
    }
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
    <main className={ styles.main }>
      <section className={ styles.categories }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleFilter() }
        >
          <img src={ allRecipesIcon } alt="all recipes icon" />
          <span>All</span>
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => handleFilter('meal') }
        >
          <img src={ allMealsIcon } alt="meal recipes icon" />
          <span>Meal</span>
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleFilter('drink') }
        >
          <img src={ allDrinksIcon } alt="drink recipes icon" />
          <span>Drink</span>
        </button>
      </section>
      <section className={ styles.recipes_section }>
        <ul className={ styles.recipes_list }>
          { favoriteRecipesToShow.map((recipe, index) => (
            <li key={ index }>
              <Link to={ `../${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt=""
                  className={ styles.favorite_image }
                />
                <div className={ styles.recipe_data }>
                  <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} ${recipe.category}` }
                    { recipe.type === 'drink' && <p>{ ` ${recipe.alcoholicOrNot}` }</p> }
                  </span>
                </div>
              </Link>
              <div className={ styles.recipe_buttons }>
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
              </div>
            </li>
          )) }
        </ul>
      </section>
    </main>
  );
}

export default FavoriteRecipes;

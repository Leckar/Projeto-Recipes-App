import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import styles from './DoneRecipes.module.css';
import allRecipesIcon from '../images/AllRecipesIcon.svg';
import allMealsIcon from '../images/allMealsIcon.svg';
import allDrinksIcon from '../images/allDrinksIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setdoneRecipes] = useState([]);
  const [doneRecipesToShow, setDoneRecipesToShow] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    const doneRecipestorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipestorage) {
      setdoneRecipes(doneRecipestorage);
      setDoneRecipesToShow(doneRecipestorage);
      setLinkCopied('');
    }
  }, []);

  const handleFilter = (type) => {
    if (type) {
      const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === type);
      setDoneRecipesToShow(filteredRecipes);
    } else setDoneRecipesToShow(doneRecipes);
  };

  const handleShare = (id, type) => {
    const url = `${window.location.origin}/${type}s/${id}`;
    setLinkCopied(id);
    copy(url);
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
          { doneRecipesToShow.map((recipe, index) => (
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
                  <span
                    data-testid={ `${index}-horizontal-top-text` }
                    className={ styles.recipe_category }
                  >
                    { `${recipe.nationality} ${recipe.category}` }
                    { recipe.type === 'drink' && <p>{ recipe.alcoholicOrNot }</p> }
                  </span>
                  <p
                    className={ styles.recipe_type }
                  >
                    {
                      recipe.tags.map((tag) => (
                        <span
                          key={ `${index}-${tag}-horizontal-tag` }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </span>
                      ))
                    }
                  </p>
                  <span
                    className={ styles.recipe_date }
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    { recipe.doneDate }
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
              </div>
            </li>
          )) }
        </ul>
      </section>
    </main>
  );
}

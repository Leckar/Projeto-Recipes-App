import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import styles from './FavoriteRecipes.module.css';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setdoneRecipes] = useState([]);
  const [doneRecipesToShow, setDoneRecipesToShow] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    const doneRecipestorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setdoneRecipes(doneRecipestorage);
    setDoneRecipesToShow(doneRecipestorage);
    setLinkCopied('');
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
          { doneRecipesToShow.map((recipe, index) => (
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
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { recipe.doneDate}
                </span>
                <p>
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
            </li>
          )) }
        </ul>
      </section>
    </main>
  );
}

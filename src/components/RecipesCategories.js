import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isFetchingRecipes, setRecipesToShow } from '../redux/actions';
import allMealsIcon from '../images/allMealsIcon.svg';
import allDrinksIcon from '../images/allDrinksIcon.svg';
import beefIcon from '../images/beefIcon.svg';
import breakfastIcon from '../images/breakfastIcon.svg';
import chickenIcon from '../images/chickenIcon.svg';
import dessertIcon from '../images/dessertIcon.svg';
import lambIcon from '../images/lambIcon.svg';
import ordinaryDrinksIcon from '../images/ordinaryDrinksIcon.svg';
import cocktailIcon from '../images/cocktailIcon.svg';
import shakeIcon from '../images/shakeIcon.svg';
import otherIcon from '../images/otherIcon.svg';
import cocoaIcon from '../images/cocoaIcon.svg';
import styles from '../Pages/Recipes.module.css';

const START_MAX_INDEX = 4;

const categoryIcon = {
  Beef: beefIcon,
  Breakfast: breakfastIcon,
  Chicken: chickenIcon,
  Dessert: dessertIcon,
  Goat: lambIcon,
  'Ordinary Drink': ordinaryDrinksIcon,
  Cocktail: cocktailIcon,
  Shake: shakeIcon,
  'Other/Unknown': otherIcon,
  Cocoa: cocoaIcon,
};

function RecipesCards() {
  const { location: { pathname } } = useHistory();
  const [prevFilter, setPrevFilter] = useState('');
  const categories = useSelector((state) => state.recipes.categories);
  const dispatch = useDispatch();

  const handleCategory = async (name) => {
    const type = pathname.slice(1);
    const url = () => {
      if (name === 'All' || prevFilter === name) return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`;
      return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/filter.php?c=${name}`;
    };
    setPrevFilter(name);
    dispatch(isFetchingRecipes());
    const response = await fetch(url());
    const { [type]: result } = await response.json();
    dispatch(setRecipesToShow(result));
  };

  return (
    <>
      <li
        className={ styles.category }
      >
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleCategory('All') }
        >
          <img src={ pathname === '/meals' ? allMealsIcon : allDrinksIcon } alt="" />
          <span>All</span>
        </button>
      </li>
      {
        categories.reduce((categoriesToShow, category, index) => {
          if (index >= 0 && index <= START_MAX_INDEX) {
            return [...categoriesToShow, (
              <li
                className={ styles.category }
                key={ index }
              >
                <button
                  type="button"
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => handleCategory(category.strCategory) }
                >
                  <img src={ categoryIcon[category.strCategory] } alt="" />
                  <span>{ category.strCategory }</span>
                </button>
              </li>
            )];
          } return categoriesToShow;
        }, [])
      }
    </>
  );
}

export default RecipesCards;

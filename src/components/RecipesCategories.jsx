import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../Pages/Recipes.module.css';
import { isFetchingRecipes, setRecipesToShow } from '../redux/actions';

const START_MAX_INDEX = 4;

function RecipesCards() {
  const { location: { pathname } } = useHistory();
  // const [minIndex, setMinIndex] = useState(0);
  // const [maxIndex, setMaxIndex] = useState(START_MAX_INDEX);
  const categories = useSelector((state) => state.recipes.categories);
  const dispatch = useDispatch();

  const handleCategory = async ({ target }) => {
    const type = pathname.slice(1);
    const url = () => {
      if (target.name === 'All') return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`;
      return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/filter.php?c=${target.name}`;
    };
    dispatch(isFetchingRecipes());
    const response = await fetch(url());
    const { [type]: result } = await response.json();
    dispatch(setRecipesToShow(result));
  };

  return (
    <>
      <li
        className={ styles.recipe_card }
      >
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ handleCategory }
        >
          All
        </button>
      </li>
      {
        categories.reduce((categoriesToShow, category, index) => {
          if (index >= 0 && index <= START_MAX_INDEX) {
            return [...categoriesToShow, (
              <li
                className={ styles.recipe_card }
                key={ index }
              >
                <button
                  type="button"
                  name={ category.strCategory }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ handleCategory }
                >
                  { category.strCategory }
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

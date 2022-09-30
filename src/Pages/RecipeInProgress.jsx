import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipeDetails from '../utils/fetchRecipeDetails';
// import {
//   RECIPE_COMPLETE,
//   RECIPE_INPROGRESS,
// } from '../utils/localStorageKeys';
import Loading from '../components/Loading';

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const typeAndID = pathname.split('/');

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipeInfo = async () => {
      const recipeDetail = await fetchRecipeDetails(typeAndID[1], typeAndID[2]);
      setRecipe({ ...recipeDetail });
    };
    getRecipeInfo();
  }, []);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) setLoading(false);
  }, [recipe]);

  console.log(recipe);

  return (
    <main>
      { loading ? <Loading /> : (
        <>
          <img src="" alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">
            { typeAndID[1] === 'meals' ? recipe.strMeal : recipe.strDrink }
          </h1>
          <button
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Share
          </button>
          <p data-testid="recipe-category">category</p>
          <ul data-testid="instructions">
            { Object.entries(recipe).reduce((ingredients, detail, index) => {
              if (detail[0].includes('strIngredient')) {
                if (detail[1] === '' || detail[1] === null) return ingredients;
                const ingredientNumber = detail[0].replace('strIngredient', '');
                const measure = recipe[`strMeasure${ingredientNumber}`];
                const comparator = {
                  meals: (x) => x !== '',
                  drinks: (x) => x !== null,
                };
                return [...ingredients, (
                  <li
                    data-testid={ `${
                      Number(ingredientNumber) - 1}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    <label
                      htmlFor={ `${Number(ingredientNumber) - 1}}-ingredient` }
                      data-testid={ `${Number(ingredientNumber) - 1}}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ `${Number(ingredientNumber) - 1}}-ingredient` }
                      />
                      { `${detail[1]} ${
                        comparator[typeAndID[1]](measure) ? measure : ''}` }
                    </label>
                  </li>
                )];
              } return ingredients;
            }, []) }
          </ul>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish
          </button>
        </>
      ) }
    </main>
  );
}

export default RecipeInProgress;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipeDetails from '../utils/fetchRecipeDetails';
import fetchToRecipes from '../utils/fetchToRecipes';
import styles from './RecipeDetails.module.css';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const recipeInfo = pathname.split('/');

  useEffect(() => {
    const getDetails = async () => {
      const result = await fetchRecipeDetails(recipeInfo[1], recipeInfo[2]);
      setDetails({ ...result });
      const type = (recipeInfo[1] === 'meals') ? 'drinks' : 'meals';
      const recomendedRecipe = await fetchToRecipes(type);
      console.log(recomendedRecipe);
    };
    getDetails();
  }, []);

  useEffect(() => {
    if (Object.keys(details).length > 1) {
      setLoading(false);
    }
  }, [details]);

  return (
    <main>
      { loading ? <span>carregando...</span> : (
        <>
          <img
            src={ recipeInfo[1] === 'meals'
              ? details.strMealThumb
              : details.strDrinkThumb }
            alt=""
            data-testid="recipe-photo"
            className={ styles.image }
          />
          <h1
            data-testid="recipe-title"
          >
            { recipeInfo[1] === 'meals' ? details.strMeal : details.strDrink }
          </h1>
          <p data-testid="recipe-category">
            { recipeInfo[1] === 'meals' ? details.strCategory : details.strAlcoholic }
          </p>
          <ul>
            { Object.entries(details).reduce((ingredients, detail, index) => {
              if (detail[0].includes('strIngredient')) {
                if (detail[1] === '' || detail[1] === null) return ingredients;
                const ingredientNumber = detail[0].replace('strIngredient', '');
                const measure = details[`strMeasure${ingredientNumber}`];
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
                    { `${detail[1]} ${
                      comparator[recipeInfo[1]](measure) ? measure : ''}` }
                  </li>
                )];
              } return ingredients;
            }, []) }
          </ul>
          <p data-testid="instructions">{ details.strInstructions }</p>
          { (recipeInfo[1] === 'meals') && (
            <iframe
              src={ details.strYoutube.replace('watch?v=', 'embed/') }
              title="recipe video"
              allowFullScreen
              data-testid="video"
            />
          ) }
        </>
      ) }
    </main>
  );
}

export default RecipeDetails;

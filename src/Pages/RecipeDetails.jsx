import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecipeDetails } from '../redux/actions';
import fetchRecipeDetails from '../utils/fetchRecipeDetails';
import fetchToRecipes from '../utils/fetchToRecipes';
import styles from './RecipeDetails.module.css';

function RecipeDetails() {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [recommendedRecipe, setRecommendedRecipe] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();

  const recipeInfo = history.location.pathname.split('/');
  const recomendedArrayLength = 6;

  useEffect(() => {
    if (loading && Object.keys(recommendedRecipe).length > 0) {
      history.push(`../${recipeInfo[1] === 'meals' ? 'drinks' : 'meals'}/${
        recipeInfo[1] === 'meals'
          ? recommendedRecipe.idDrink : recommendedRecipe.idMeal}`);
    }
  }, [loading, recommendedRecipe]);

  useEffect(() => {
    const getDetails = async () => {
      const result = await fetchRecipeDetails(recipeInfo[1], recipeInfo[2]);
      setDetails({ ...result });
      const type = (recipeInfo[1] === 'meals') ? 'drinks' : 'meals';
      const recipes = await fetchToRecipes(type);
      const recomended = recipes.filter((_, index) => index < recomendedArrayLength);
      setRecommendedRecipes(recomended);
    };
    getDetails();
  }, [history.location.pathname]);

  useEffect(() => {
    if (Object.keys(details).length > 1) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes) {
        const recipeId = details[recipeInfo[1] === 'meals' ? 'idMeal' : 'idDrink'];
        const currRecipeIsDone = doneRecipes.some((recipe) => recipe.id === recipeId);
        setIsDone(currRecipeIsDone);
      }
      const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (startedRecipes) {
        const recipeId = recipeInfo[1] === 'meals' ? details.idMeal : details.idDrink;
        setInProgress(startedRecipes[recipeInfo[1]][recipeId] !== undefined);
      }
      setLoading(false);
    }
  }, [details]);

  const handleRecomended = (recipe) => {
    setRecommendedRecipe(recipe);
    setLoading(true);
  };

  const handleStartRecipe = () => {
    dispatch(setRecipeDetails(details));
    history.push(`${history.location.pathname}/in-progress`);
  };

  return (
    <main className={ styles.container }>
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
          <ul className={ styles.recommendations }>
            { recommendedRecipes.map((recipe, index) => (
              <li
                key={ index }
                className={ styles.recommendation }
                data-testid={ `${index}-recommendation-card` }
              >
                <button type="button" onClick={ () => handleRecomended(recipe) }>
                  <img
                    src={
                      recipe[(recipeInfo[1] === 'meals'
                        ? 'strDrinkThumb' : 'strMealThumb')]
                    }
                    alt=""
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {recipe[(recipeInfo[1] === 'meals' ? 'strDrink' : 'strMeal')]}
                  </p>
                </button>
              </li>
            )) }
          </ul>
          {!isDone && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleStartRecipe }
              className={ styles.start_button }
            >
              {inProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </>
      ) }
    </main>
  );
}

export default withRouter(RecipeDetails);

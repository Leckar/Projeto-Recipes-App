import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import fetchRecipeDetails from '../utils/fetchRecipeDetails';
import fetchToRecipes from '../utils/fetchToRecipes';
import styles from './RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import unfavoritedIcon from '../images/whiteHeartIcon.svg';
import Loading from '../components/Loading';

const copy = require('clipboard-copy');

const LAST_CHARACTER = -1;
const FAVORITE_ICON = {
  true: favoritedIcon,
  false: unfavoritedIcon,
};
function RecipeDetails() {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [recommendedRecipe, setRecommendedRecipe] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
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
    const lastFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (lastFavoriteRecipes) setFavoriteRecipes(lastFavoriteRecipes);
    const getDetails = async () => {
      const result = await fetchRecipeDetails(recipeInfo[1], recipeInfo[2]);
      setDetails({ ...result });
      const type = (recipeInfo[1] === 'meals') ? 'drinks' : 'meals';
      const recipes = await fetchToRecipes(type);
      const recomended = recipes.filter((_, index) => index < recomendedArrayLength);
      setRecommendedRecipes(recomended);
    };
    getDetails();
    setWasCopied(false);
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
  useEffect(() => {
    if (Object.keys(details).length > 1) {
      const lastFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (lastFavoriteRecipes) {
        const recipeId = recipeInfo[1] === 'meals' ? details.idMeal : details.idDrink;
        const currRecipeIsFavorite = lastFavoriteRecipes
          .some((recipe) => recipe.id === recipeId);
        setIsFavorite(currRecipeIsFavorite);
      }
    }
  }, [details, isFavorite]);
  const handleRecomended = (recipe) => {
    setRecommendedRecipe(recipe);
    setLoading(true);
  };
  const handleStartRecipe = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };
  const handleShare = () => {
    setWasCopied(true);
    copy(window.location.href);
  };
  const handleFavorite = () => {
    if (isFavorite) {
      const lastFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const recipeId = recipeInfo[1] === 'meals' ? details.idMeal : details.idDrink;
      const newFavoriteRecipes = lastFavoriteRecipes
        .filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const recipe = {
        id: recipeInfo[1] === 'meals' ? details.idMeal : details.idDrink,
        type: recipeInfo[1].slice(0, LAST_CHARACTER),
        nationality: recipeInfo[1] === 'meals' ? details.strArea : '',
        category: details.strCategory,
        alcoholicOrNot: recipeInfo[1] === 'meals' ? '' : details.strAlcoholic,
        name: recipeInfo[1] === 'meals' ? details.strMeal : details.strDrink,
        image: recipeInfo[1] === 'meals' ? details.strMealThumb : details.strDrinkThumb,
      };
      const newFavoriteRecipes = [...favoriteRecipes, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };
  return (
    <main className={ styles.container }>
      { loading ? <Loading /> : (
        <>
          <header className={ styles.header }>
            <img
              src={ recipeInfo[1] === 'meals'
                ? details.strMealThumb
                : details.strDrinkThumb }
              alt=""
              data-testid="recipe-photo"
              className={ styles.image }
            />
            <p data-testid="recipe-category" className={ styles.recipe_category }>
              { recipeInfo[1] === 'meals' ? details.strCategory : details.strAlcoholic }
            </p>
            <h1
              data-testid="recipe-title"
              className={ styles.recipe_title }
            >
              { recipeInfo[1] === 'meals' ? details.strMeal : details.strDrink }
            </h1>
            <div className={ styles.button_container }>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleShare }
              >
                <img src={ shareIcon } alt="" />
              </button>
              { wasCopied && <span>Link copied!</span> }
              <button
                type="button"
                onClick={ handleFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ FAVORITE_ICON[isFavorite] }
                  alt=""
                />
              </button>
            </div>
          </header>
          <section className={ styles.detail_container }>
            <section className={ styles.info_container }>
              <h3>Ingredients</h3>
              <ul className={ styles.content_container }>
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
                      <li key={ index } className={ styles.list_item }>
                        •
                        <span
                          data-testid={ `${
                            Number(ingredientNumber) - 1}-ingredient-name-and-measure` }
                        >
                          { `${detail[1]} ${
                            comparator[recipeInfo[1]](measure) ? measure : ''}` }
                        </span>
                      </li>
                    )];
                  } return ingredients;
                }, []) }
              </ul>
            </section>
            <section className={ styles.info_container }>
              <h3>Instructions</h3>
              <p
                data-testid="instructions"
                className={ styles.content_container }
              >
                { details.strInstructions }
              </p>
            </section>
            { (recipeInfo[1] === 'meals') && (
              <section className={ styles.info_container }>
                <h3>Video</h3>
                <iframe
                  src={ details.strYoutube.replace('watch?v=', 'embed/') }
                  title="recipe video"
                  allowFullScreen
                  data-testid="video"
                  className={ styles.video }
                />
              </section>
            ) }
            <section className={ styles.info_container }>
              <h3>Recommended</h3>
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
            </section>
            {!isDone && (
              <div className={ styles.start_button }>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  onClick={ handleStartRecipe }
                >
                  {inProgress ? 'Continue Recipe' : 'Start Recipe'}
                </button>
              </div>
            )}
          </section>
        </>
      ) }
    </main>
  );
}

export default withRouter(RecipeDetails);

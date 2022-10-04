import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipeDetails from '../utils/fetchRecipeDetails';
import { RECIPE_INPROGRESS } from '../utils/localStorageKeys';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import unfavoritedIcon from '../images/whiteHeartIcon.svg';
import Loading from '../components/Loading';
import styles from './RecipeInProgress.module.css';

const copy = require('clipboard-copy');

const LAST_CHARACTER = -1;
const FAVORITE_ICON = {
  true: favoritedIcon,
  false: unfavoritedIcon,
};

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const typeAndID = pathname.split('/');

  const [loading, setLoading] = useState(true);
  const [wasCopied, setWasCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [checks, setChecks] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const getRecipeInfo = async () => {
      const recipeDetail = await fetchRecipeDetails(typeAndID[1], typeAndID[2]);
      setRecipe({ ...recipeDetail });
    };
    getRecipeInfo();
  }, []);

  const progressChecker = (list) => {
    if (list.every((e) => e !== false)) setIsFinished(true);
    else setIsFinished(false);
  };

  const setCheckBoxCheckeds = (inProgressRecipes) => {
    const recipeId = typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink;
    const recipeProgress = Object.entries(inProgressRecipes[typeAndID[1]])
      .find((recipeInProgress) => recipeInProgress[0] === recipeId);
    progressChecker(recipeProgress[1]);
    setChecks([...recipeProgress[1]]);
  };

  const setInitialValues = (inProgressRecipes) => {
    const recipeId = typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink;
    const ingredientsChecks = Object.entries(recipe)
      .filter((key) => key[0].includes('strIngredient'))
      .filter((key) => key[1] !== '')
      .filter((key) => key[1] !== null)
      .map(() => false);
    if (inProgressRecipes) {
      localStorage.setItem(RECIPE_INPROGRESS, JSON.stringify({
        ...inProgressRecipes,
        [typeAndID[1]]: {
          ...inProgressRecipes[typeAndID[1]],
          [recipeId]: [...ingredientsChecks],
        },
      }));
    } else {
      localStorage.setItem(RECIPE_INPROGRESS, JSON.stringify({
        [typeAndID[1] === 'meals' ? 'drinks' : 'meals']: {},
        [typeAndID[1]]: { [recipeId]: [...ingredientsChecks] },
      }));
    }
    setChecks([...ingredientsChecks]);
  };

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      const inProgressRecipes = JSON.parse(localStorage.getItem(RECIPE_INPROGRESS));
      const recipeId = typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink;
      if (!inProgressRecipes) {
        setInitialValues(inProgressRecipes);
      } else {
        const isInProgress = Object.keys(inProgressRecipes[typeAndID[1]])
          .some((recipeInProgress) => recipeInProgress === recipeId);
        if (isInProgress) setCheckBoxCheckeds(inProgressRecipes);
        else {
          setInitialValues(inProgressRecipes);
        }
      }
      setLoading(false);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        const recipeIsFavorite = favoriteRecipes
          .some((favoriteRecipe) => favoriteRecipe.id === recipeId);
        setIsFavorite(recipeIsFavorite);
      } else localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [recipe]);

  const handleFavorite = () => {
    const lastFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorite) {
      const recipeId = typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink;
      const newFavoriteRecipes = lastFavoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipe = {
        id: typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink,
        type: typeAndID[1].slice(0, LAST_CHARACTER),
        nationality: typeAndID[1] === 'meals' ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: typeAndID[1] === 'meals' ? '' : recipe.strAlcoholic,
        name: typeAndID[1] === 'meals' ? recipe.strMeal : recipe.strDrink,
        image: typeAndID[1] === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      };
      const newFavoriteRecipes = [...lastFavoriteRecipes, newFavoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };

  const handleShare = () => {
    setWasCopied(true);
    copy(`${window.location.origin}/${typeAndID[1]}/${typeAndID[2]}`);
  };

  useEffect(() => {
    if (checks.length > 0) {
      const inProgressRecipes = JSON.parse(localStorage.getItem(RECIPE_INPROGRESS));
      const recipeId = typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink;
      localStorage.setItem(RECIPE_INPROGRESS, JSON.stringify({
        ...inProgressRecipes,
        [typeAndID[1]]: {
          ...inProgressRecipes[typeAndID[1]],
          [recipeId]: [...checks],
        },
      }));
    }
  }, [checks]);

  const handleCompleteIngredient = (index, checked) => {
    const newChecks = checks;
    newChecks[index] = checked;
    progressChecker(newChecks);
    setChecks([...newChecks]);
  };

  const handleFinish = () => {
    const newDate = new Date();
    const recTags = recipe.strTags !== null ? recipe.strTags.split(', ') : [];

    const doneRecipe = {
      id: typeAndID[1] === 'meals' ? recipe.idMeal : recipe.idDrink,
      type: typeAndID[1].slice(0, LAST_CHARACTER),
      nationality: typeAndID[1] === 'meals' ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: typeAndID[1] === 'meals' ? '' : recipe.strAlcoholic,
      name: typeAndID[1] === 'meals' ? recipe.strMeal : recipe.strDrink,
      image: typeAndID[1] === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`,
      tags: recTags,
    };
    const lastDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (lastDoneRecipes) {
      const newDoneRecipes = [...lastDoneRecipes, doneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    const newInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete newInProgressRecipes[typeAndID[1]][doneRecipe.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
    history.push('../../done-recipes');
  };

  return (
    <main className={ styles.container }>
      { loading ? <Loading /> : (
        <>
          <header className={ styles.header }>
            <img
              src={ typeAndID[1] === 'meals'
                ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt=""
              data-testid="recipe-photo"
              className={ styles.image }
            />
            <p data-testid="recipe-category" className={ styles.recipe_category }>
              { typeAndID[1] === 'meals' ? recipe.strCategory : recipe.strAlcoholic }
            </p>
            <h1
              data-testid="recipe-title"
              className={ styles.recipe_title }
            >
              { typeAndID[1] === 'meals' ? recipe.strMeal : recipe.strDrink }
            </h1>
            <div className={ styles.button_container }>
              <button
                type="button"
                onClick={ handleShare }
              >
                <img data-testid="share-btn" src={ shareIcon } alt="" />
              </button>
              { wasCopied && <span>Link copied!</span> }
              <button
                type="button"
                onClick={ handleFavorite }
              >
                <img data-testid="favorite-btn" src={ FAVORITE_ICON[isFavorite] } alt="" />
              </button>
            </div>
          </header>
          <section className={ styles.detail_container }>
            <section className={ styles.info_container }>
              <h3>Ingredients</h3>
              <ul data-testid="instructions" className={ styles.content_container }>
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
                        key={ index }
                      >
                        <label
                          htmlFor={ `${Number(ingredientNumber) - 1}-ingredient` }
                          data-testid={ `${Number(ingredientNumber) - 1}-ingredient-step` }
                        >
                          <input
                            type="checkbox"
                            id={ `${Number(ingredientNumber) - 1}-ingredient` }
                            checked={ checks[Number(ingredientNumber) - 1] }
                            onChange={ ({ target: { checked } }) => {
                              handleCompleteIngredient(Number(ingredientNumber) - 1, checked);
                            } }
                          />
                          { `${detail[1]} ${
                            comparator[typeAndID[1]](measure) ? measure : ''}` }
                        </label>
                      </li>
                    )];
                  } return ingredients;
                }, []) }
              </ul>
            </section>
            <div className={ styles.finish_button }>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ !isFinished }
                onClick={ handleFinish }
              >
                Finish
              </button>
            </div>
          </section>
        </>
      ) }
    </main>
  );
}

export default RecipeInProgress;

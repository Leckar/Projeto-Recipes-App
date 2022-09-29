import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import {
  setRecipesToShow,
  isFetchingRecipes,
  setCategoriesToShow,
} from '../redux/actions';
import fetchToRecipes from '../utils/fetchToRecipes';
import styles from './Recipes.module.css';
import RecipesCards from '../components/RecipesCards';
import RecipesCategories from '../components/RecipesCategories';
import fetchCategories from '../utils/fetchCategories';
import Loading from '../components/Loading';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const loading = useSelector((state) => state.recipes.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      dispatch(isFetchingRecipes());
      const type = pathname.slice(1);
      const recipesResult = await fetchToRecipes(type);
      const categoriesResult = await fetchCategories(type);
      dispatch(setCategoriesToShow(categoriesResult));
      dispatch(setRecipesToShow(recipesResult));
    };
    fetchRecipes();
  }, [pathname]);

  return (
    <main>
      <ul className={ styles.categories }>
        <RecipesCategories />
      </ul>
      { loading ? <Loading /> : (
        <ul className={ styles.recipes }>
          <RecipesCards />
        </ul>
      ) }
    </main>
  );
}

export default withRouter(Recipes);

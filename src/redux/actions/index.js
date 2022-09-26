export const REQUEST_USER = 'REQUEST_USER';
export const RECIPES_TO_SHOW = 'RECIPES_TO_SHOW';
export const IS_FETCHING_RECIPES = 'IS_FETCHING_RECIPES';
export const CATEGORIES_TO_SHOW = 'CATEGORIES_TO_SHOW';

export const requestUser = (payload) => ({
  type: REQUEST_USER,
  payload,
});

export const isFetchingRecipes = () => ({
  type: IS_FETCHING_RECIPES,
});

export const setRecipesToShow = (payload) => ({
  type: RECIPES_TO_SHOW,
  payload,
});

export const setCategoriesToShow = (payload) => ({
  type: CATEGORIES_TO_SHOW,
  payload,
});

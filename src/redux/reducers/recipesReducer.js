import { IS_FETCHING_RECIPES, RECIPES_TO_SHOW, CATEGORIES_TO_SHOW } from '../actions';

const INITIAL_STATE = {
  array: [],
  isFetching: true,
  categories: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_TO_SHOW:
    return { ...state, array: [...action.payload], isFetching: false };
  case IS_FETCHING_RECIPES:
    return { ...state, isFetching: true };
  case CATEGORIES_TO_SHOW:
    return { ...state, categories: [...action.payload], isFetching: false };
  default:
    return { ...state };
  }
};

export default recipesReducer;

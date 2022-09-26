import { IS_FETCHING_RECIPES, RECIPES_TO_SHOW } from '../actions';

const INITIAL_STATE = {
  array: [],
  isFetching: false,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_TO_SHOW:
    return { ...state, array: [...action.payload] };
  case IS_FETCHING_RECIPES:
    return { ...state, isFetching: action.payload };
  default:
    return { ...state };
  }
};

export default recipesReducer;

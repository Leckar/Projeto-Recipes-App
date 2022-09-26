import { RECIPES_TO_SHOW } from '../actions';

const INITIAL_STATE = {
  array: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_TO_SHOW:
    return { ...state, array: [...action.payload] };
  default:
    return { ...state };
  }
};

export default recipes;

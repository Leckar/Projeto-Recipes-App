export const REQUEST_USER = 'REQUEST_USER';
export const RECIPES_TO_SHOW = 'RECIPES_TO_SHOW';

export const requestUser = (payload) => ({
  type: REQUEST_USER,
  payload,
});

export const setRecipesToShow = (payload) => ({
  type: RECIPES_TO_SHOW,
  payload,
});

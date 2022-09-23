import { REQUEST_USER } from '../Actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_USER: return {
    ...state,
    email: action.payload,
  };
  default: return {
    ...state,
  };
  }
};

export default userReducer;

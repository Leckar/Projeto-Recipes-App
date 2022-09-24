import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

const createMockStore = (initialState) => (
  createStore(rootReducer, initialState, applyMiddleware(thunk))
);

const renderWith = (
  component,
  route = '/',
  { initialState, store = createMockStore(initialState) } = {},
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    store,
    history });
};

export default renderWith;

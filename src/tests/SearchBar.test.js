import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DRINK_MOCK from './mocks/drinkRecipesMock';
import renderWith from './helpers/renderWith';
import App from '../App';

describe('Teste se a SearchBar está funcionando corretamente', () => {
  test('Se ao pesquisar gin como nome nos drinks renderiza corretamente os 12 itens na página', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DRINK_MOCK),
    });
    renderWith(<App />, '/drinks');

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'caipirinha');
  });
});

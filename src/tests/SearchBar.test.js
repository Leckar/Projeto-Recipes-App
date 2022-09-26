import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DRINK_MOCK from './mocks/drinkRecipesMock';
import renderWith from './helpers/renderWith';
import App from '../App';

const SEARCH_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BUTTON = 'exec-search-btn';

describe('Teste se a SearchBar está funcionando corretamente', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DRINK_MOCK),
    });
  });

  test('Se ao pesquisar gin como nome nos drinks renderiza corretamente os 12 itens na página', async () => {
    renderWith(<App />, '/drinks');
    window.alert = () => {};

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'caipirinha');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
  });

  test('Se tentar pesquisar pela primeira letra com mais de um caracter aparece um alerta', async () => {
    renderWith(<App />, '/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'ca');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });

  test('Se ao der erro no Fetch aparece uma mensagem de alerta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(new Error());

    renderWith(<App />, '/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'xablau');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});

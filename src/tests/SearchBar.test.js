import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DRINK_MOCK, ONLY_ONE_DRINK, FILTER_BY_INGREDIENT_DRINK } from './mocks/drinkRecipesMock';
import { MEALS_MOCK, ONLY_ONE_MEAL, FILTER_BY_INGREDIENT_MEAL } from './mocks/mealsRecipesMock';
import renderWith from './helpers/renderWith';
import App from '../App';

const SEARCH_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BUTTON = 'exec-search-btn';
const FIRST_LETTER_BUTTON = 'first-letter-search-radio';

describe('Teste se a SearchBar para Drinks está funcionando corretamente', () => {
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
    userEvent.click(screen.getByTestId(FIRST_LETTER_BUTTON));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });

  test('Se tentar pesquisar pela primeira letra com um caracter passa', async () => {
    renderWith(<App />, '/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'c');
    userEvent.click(screen.getByTestId(FIRST_LETTER_BUTTON));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
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

  test('Se possuir apenas um item na pesquisa redicionar para os detalhes dele', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ONLY_ONE_DRINK),
    });

    const { history } = renderWith(<App />, '/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'caipirinha');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(global.fetch).toBeCalled());

    expect(history.location.pathname).toBe('/drinks/11202');
  });

  test('Se pesquisa por ingrediente funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(FILTER_BY_INGREDIENT_DRINK),
    });

    renderWith(<App />, '/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'caipirinha');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
  });
});

describe('Teste se a SearchBar para Meals está funcionando corretamente', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEALS_MOCK),
    });
  });

  test('Se ao pesquisar gin como nome nos meals renderiza corretamente os 12 itens na página', async () => {
    renderWith(<App />, '/meals');
    window.alert = () => {};

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'rice');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
  });

  test('Se tentar pesquisar pela primeira letra com mais de um caracter aparece um alerta', async () => {
    renderWith(<App />, '/meals');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'r');
    userEvent.click(screen.getByTestId(FIRST_LETTER_BUTTON));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
  });

  test('Se ao der erro no Fetch aparece uma mensagem de alerta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(new Error());

    renderWith(<App />, '/meals');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'xablau');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });

  test('Se possuir apenas um item na pesquisa redicionar para os detalhes dele', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ONLY_ONE_MEAL),
    });

    const { history } = renderWith(<App />, '/meals');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'caipirinha');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitFor(() => expect(global.fetch).toBeCalled());

    expect(history.location.pathname).toBe('/meals/53033');
  });

  test('Se pesquisa por ingrediente funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(FILTER_BY_INGREDIENT_MEAL),
    });

    renderWith(<App />, '/meals');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'caipirinha');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/carregando.../i), 500);
  });
});

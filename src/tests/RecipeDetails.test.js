import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import { MEALS_MOCK } from './mocks/mealsRecipesMock';
import App from '../App';

const favoriteButtonText = 'favorite-btn';
const mockPathMeals = '/meals/52977';
const mockPathDrinks = '/drinks/15997';

describe('Testa o componente RecipeDetails', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(DRINK_MOCK),
  //   });
  // });

  test('a página RecipeDetails para as meals', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        unputValue: '',
      },
    };

    const { history } = renderWith(<App />, mockPathMeals, initialState);
    expect(history.location.pathname).toBe(mockPathMeals);

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      const headline = screen.getByTestId('recipe-title');
      const buttonShare = screen.getByTestId('share-btn');
      const buttonFavorite = screen.getByTestId(favoriteButtonText);
      const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
      const instructions = screen.getByTestId('instructions');
      const video = screen.getByTestId('video');

      expect(photo).toBeInTheDocument();
      expect(headline).toBeInTheDocument();
      expect(buttonShare).toBeInTheDocument();
      expect(buttonFavorite).toBeInTheDocument();
      expect(ingredients[0].innerHTML).toBe('Lentils 1 cup ');
      expect(instructions).toBeInTheDocument();
      expect(video).toBeInTheDocument();
    });
  });

  test('a página RecipeDetails para os drinks', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        unputValue: '',
      },
    };

    const { history } = renderWith(<App />, mockPathDrinks, initialState);
    expect(history.location.pathname).toBe(mockPathDrinks);

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      const headline = screen.getByTestId('recipe-title');
      const buttonShare = screen.getByTestId('share-btn');
      const buttonFavorite = screen.getByTestId(favoriteButtonText);
      const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
      const instructions = screen.getByTestId('instructions');

      expect(photo).toBeInTheDocument();
      expect(headline).toBeInTheDocument();
      expect(buttonShare).toBeInTheDocument();
      expect(buttonFavorite).toBeInTheDocument();
      expect(ingredients[0].innerHTML).toBe('Galliano 2 1/2 shots ');
      expect(instructions).toBeInTheDocument();
    });
  });

  test('se o RecipeDetails das meals está na localStorage', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        unputValue: '',
      },
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52977',
        type: '',
        category: '',
        nationality: '',
        alcoholicOrNot: '',
        name: '',
        iamge: '',
      },
    ]));

    const { history } = renderWith(<App />, mockPathMeals, initialState);
    expect(history.location.pathname).toBe(mockPathMeals);

    await waitForElementToBeRemoved(screen.getByText(/loading/i));
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorite = screen.getByTestId(favoriteButtonText);
    const startRecipe = screen.getByTestId('start-recipe-btn');

    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Start Recipe');
  });

  test('os cards de recomendados para meals', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        unputValue: '',
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: {},
      },
    }));

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEALS_MOCK),
    });

    const { history } = renderWith(<App />, mockPathMeals, initialState);
    expect(history.location.pathname).toBe(mockPathMeals);

    await waitFor(() => {
    // await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const recommendation = screen.getByTestId('0-recommendation-title');
      expect(recommendation).toBeInTheDocument();

      const recommendationCard = screen.getByRole('0-recommendation-card');
      expect(recommendationCard).toBeInTheDocument();
    });
  });

  test('os cards de recomendados para drinks', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        unputValue: '',
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        15997: {},
      },
    }));

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(DRINK_MOCK),
    });

    const { history } = renderWith(<App />, mockPathDrinks, initialState);
    expect(history.location.pathname).toBe(mockPathDrinks);

    await waitFor(() => {
    // await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const recommendation = screen.getByTestId('1-recommendation-title');
      expect(recommendation).toBeInTheDocument();

      const recommendationCard = screen.getByRole('1-recommendation-card');
      expect(recommendationCard).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

const favoriteRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

const mockPath = '/favorite-recipes';

describe('Testa página favorite Recipes', () => {
  test('Se os cards estão aparecendo corretamente', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWith(<App />, mockPath);
    expect(screen.getByTestId('0-horizontal-image').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  });
  test('Se os botões de filtro estão funcionando corretamente', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWith(<App />, mockPath);

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId('0-horizontal-name').innerHTML).toBe('Spicy Arrabiata Penne');

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId('0-horizontal-name').innerHTML).toBe('Aquamarine');

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
  });
  test('Se os cards estão aparecendo corretamente', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWith(<App />, mockPath);
    window.document.execCommand = jest.fn().mockReturnValue('success');

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});

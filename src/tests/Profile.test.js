import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

const email = 'teste@teste.test';

describe('Testa se o Login possui inputs para o email e password', () => {
  test('Se todos os elementos aparecem na tela', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    renderWith(<App />, '/profile');

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
  });
  test('Se o botão Done Recipes funciona corretamente', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    const { history } = renderWith(<App />, '/profile');

    const profileBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Se o botão Favorite Recipes funciona corretamente', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    const { history } = renderWith(<App />, '/profile');

    const favRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Se o botão Logout funciona corretamente', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    const { history } = renderWith(<App />, '/profile');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});

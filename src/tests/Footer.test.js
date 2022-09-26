import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

describe('Teste se o Footer está funcionando corretamente', () => {
  test('Se o header aparece apenas nas telas corretas e os componentes certos', () => {
    const { history } = renderWith(<App />, '/meals');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');

    history.push('/');

    expect(screen.getByTestId('footer')).toBeInTheDocument(false);
  });
});

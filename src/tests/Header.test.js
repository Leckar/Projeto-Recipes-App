import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

describe('Teste se o Header está funcionando corretamente', () => {
  test('Se o header aparece apenas nas telas corretas e os componentes certos', () => {
    const { history } = renderWith(<App />, '/meals');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    history.push('/');
  });
});

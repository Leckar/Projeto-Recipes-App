import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

describe('Testa se o Login possui inputs para o email e password', () => {
  test('Se os inputs e o botão aparecem na tela', () => {
    renderWith(<App />, '/');

    expect(screen.getByTestId('email-input')).toBeInTheDocument();

    expect(screen.getByTestId('password-input')).toBeInTheDocument();

    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  test('Se o input valida o email corretamente', () => {
    const { history } = renderWith(<App />, '/');

    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'teste@gmail.com');

    const password = screen.getByTestId('password-input');
    userEvent.type(password, '1234567');

    const buttonEnter = screen.getByTestId('login-submit-btn');

    expect(buttonEnter).toBeEnabled();
    userEvent.click(buttonEnter);

    expect(history.location.pathname).toBe('/meals');
  });
});

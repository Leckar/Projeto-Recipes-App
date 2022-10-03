import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

describe('Teste se a página Recipes está funcionando corretamente', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
  });

  test('Se o componente renderiza os botões na página', async () => {
    renderWith(<App />, '/meals');
    await waitForElementToBeRemoved(screen.getByText(/carregando/i));
    // const { history } = renderWith(<App />, '/meals');

    const beefCategoryButton = screen.getByTestId('Beef-category-filter');
    expect(beefCategoryButton).toBeInTheDocument();
    userEvent.click(beefCategoryButton);

    const firstMealCard = screen.getByTestId('0-card-name');
    await waitFor(() => expect(firstMealCard).toHaveTextContent('Beef and Mustard Pie'));

    userEvent.click(beefCategoryButton);
    await waitFor(() => expect(firstMealCard).toHaveTextContent('Corba'));
  });
});

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const START_MAX_INDEX = 11;

function Recipes() {
  const { location: { pathname } } = useHistory();
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(START_MAX_INDEX);
  const recipes = useSelector((state) => state.recipes.array);
  const loading = useSelector((state) => state.recipes.isFetching);

  useEffect(() => {
    setMinIndex(0);
    setMaxIndex(START_MAX_INDEX);
  }, []);

  return (
    <main>
      { loading ? <span>carregando...</span> : (
        <ul>
          { recipes.reduce((recipesToShow, recipe, index) => {
            if (index >= minIndex && index <= maxIndex) {
              return [...recipesToShow, (
                <li data-testid={ `${index}-recipe-card` } key={ index }>
                  <img
                    src={
                      recipe[(pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb')]
                    }
                    alt=""
                    data-testid={ `${index}-card-img` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>
                    {recipe[(pathname === '/meals' ? 'strMeal' : 'strDrink')]}
                  </h3>
                </li>
              )];
            } return recipesToShow;
          }, []) }
        </ul>
      ) }
    </main>
  );
}

export default Recipes;

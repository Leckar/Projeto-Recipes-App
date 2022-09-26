import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchToSearch from '../utils/fetchToSearch';
import { setRecipesToShow } from '../redux/actions';

function SearchBar() {
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const type = history.location.pathname.slice(1);
  const dispatch = useDispatch();

  const handleSearchInput = ({ target }) => setValue(target.value);
  const handleSearchMethod = ({ target }) => setMethod(target.value);

  const handleSearch = async () => {
    const result = await fetchToSearch({ [method]: value }, type);
    dispatch(setRecipesToShow(result));
    if (!result) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (result.length === 1) {
      history.push(`/${type}/${result[0][(type === 'meals') ? 'idMeal' : 'idDrink']}`);
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        onChange={ handleSearchInput }
        value={ value }
      />
      <label htmlFor="search-by-ingredient">
        Ingredient
        <input
          type="radio"
          name="search_by"
          id="search-by-ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onClick={ handleSearchMethod }
        />
      </label>
      <label htmlFor="search-by-name">
        Name
        <input
          type="radio"
          name="search_by"
          id="search-by-name"
          data-testid="name-search-radio"
          value="name"
          onClick={ handleSearchMethod }
        />
      </label>
      <label htmlFor="search-by-first-letter">
        First letter
        <input
          type="radio"
          name="search_by"
          id="search-by-first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onClick={ handleSearchMethod }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

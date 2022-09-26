import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchToSearch from '../utils/fetchToSearch';

function SearchBar() {
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');
  const { location: { pathname } } = useHistory();
  const type = pathname.slice(1);

  const handleSearchInput = ({ target }) => setValue(target.value);
  const handleSearchMethod = ({ target }) => setMethod(target.value);

  const handleSearch = async () => {
    const result = await fetchToSearch({ [method]: value }, type);
    console.log(result);
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

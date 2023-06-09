import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchToSearch from '../utils/fetchToSearch';
import { isFetchingRecipes, setRecipesToShow } from '../redux/actions';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const type = history.location.pathname.slice(1);
  const dispatch = useDispatch();

  const handleSearchInput = ({ target }) => setValue(target.value);
  const handleSearchMethod = ({ target }) => setMethod(target.value);

  const handleSearch = async () => {
    if (method === 'firstLetter' && value.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    dispatch(isFetchingRecipes());
    const result = await fetchToSearch({ [method]: value }, type);
    if (!result) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    dispatch(setRecipesToShow(result));
    if (result.length === 1) {
      history.push(`/${type}/${result[0][(type === 'meals') ? 'idMeal' : 'idDrink']}`);
    }
  };

  return (
    <div className={ styles.container }>
      <input
        data-testid="search-input"
        onChange={ handleSearchInput }
        value={ value }
        className={ styles.search_input }
        placeholder="Search"
      />
      <div className={ styles.search_types }>
        <label className={ styles.search_type } htmlFor="search-by-ingredient">
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
        <label className={ styles.search_type } htmlFor="search-by-name">
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
        <label className={ styles.search_type } htmlFor="search-by-first-letter">
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
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
        className={ styles.search_button }
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;

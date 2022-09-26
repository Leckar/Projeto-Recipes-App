import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIconTopBtn from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const PATHNAMES = ['/meals', '/drinks', '/profile', '/done-recipes', '/favorite-recipes'];
const LAST_CHARACTER = -1;

function Header() {
  const history = useHistory();
  const [isRendering, setIsRendering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { location: { pathname } } = history;

  useEffect(() => {
    if (PATHNAMES.includes(pathname)) {
      setIsRendering(true);
      setIsSearching(false);
    } else {
      setIsRendering(false);
    }
  }, [pathname]);

  const title = pathname.slice(1).split('-').map((item) => (
    item.charAt(0).toUpperCase() + item.slice(1)
  )).reduce((curr, string) => `${curr}${string} `, '')
    .slice(0, LAST_CHARACTER);

  const handleSearch = () => setIsSearching((prevState) => !prevState);

  if (isRendering) {
    return (
      <header>
        <h1 data-testid="page-title">
          {title}
        </h1>
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="icone" />
        </Link>
        {(['/meals', '/drinks'].includes(pathname)) && (
          <button onClick={ handleSearch } data-testid="search-button" type="button">
            <img data-testid="search-top-btn" src={ searchIconTopBtn } alt="icone" />
          </button>
        )}
        { isSearching && (<SearchBar />) }
      </header>
    );
  } return null;
}
export default withRouter(Header);
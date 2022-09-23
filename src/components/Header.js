import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIconTopBtn from '../images/searchIcon.svg';

const PATHNAMES = ['/meals', '/drinks', '/profile', '/done-recipes', '/favorite-recipes'];
const LAST_CHARACTER = -1;

function Header() {
  const history = useHistory();
  const [isRendering, setIsRendering] = useState(false);
  const { location: { pathname } } = history;

  useEffect(() => {
    if (PATHNAMES.includes(pathname)) {
      setIsRendering(true);
    } else {
      setIsRendering(false);
    }
  }, [history]);

  const title = pathname.slice(1).split('-').map((item) => (
    item.charAt(0).toUpperCase() + item.slice(1)
  )).reduce((curr, string) => `${curr}${string} `, '')
    .slice(0, LAST_CHARACTER);

  if (isRendering) {
    return (
      <header>
        <h1 data-testid="page-title">
          {title}
        </h1>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icone" />
        {(['/meals', '/drinks'].includes(pathname)) && (
          <img data-testid="search-top-btn" src={ searchIconTopBtn } alt="icone" />
        )}
      </header>
    );
  } return null;
}
export default Header;

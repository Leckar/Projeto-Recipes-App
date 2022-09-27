import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import profileIconHeader from '../images/profileIconHeader.svg';
import searchIconTopBtn from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import styles from './Header.module.css';
import logo from '../images/headerLogo.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';

const PATHNAMES = ['/meals', '/drinks', '/profile', '/done-recipes', '/favorite-recipes'];
const LAST_CHARACTER = -1;

const USE_ICON = {
  '/meals': mealIcon,
  '/drinks': drinkIcon,
  '/profile': profileIcon,
  '/done-recipes': doneIcon,
  '/favorite-recipes': favoriteIcon,
};

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
      <header className={ styles.container }>
        <section className={ styles.top_header }>
          <div className={ styles.logo_container }>
            <img src={ logo } alt="logo" />
            <div className={ styles.text_container }>
              <span className={ styles.main_text }>RECIPES</span>
              <span className={ styles.second_text }>app</span>
            </div>
          </div>
          <div className={ styles.buttons_container }>
            {(['/meals', '/drinks'].includes(pathname)) && (
              <button
                onClick={ handleSearch }
                data-testid="search-button"
                type="button"
                className={ styles.top_header_icon }
              >
                <img data-testid="search-top-btn" src={ searchIconTopBtn } alt="icone" />
              </button>
            )}
            <Link to="/profile">
              <img data-testid="profile-top-btn" src={ profileIconHeader } alt="icone" />
            </Link>
          </div>
        </section>
        <section className={ styles.foot_header }>
          <div className={ styles.title_container }>
            <img src={ USE_ICON[pathname] } alt="page logo" />
            <h2 data-testid="page-title">
              {title}
            </h2>
          </div>
          { isSearching && (<SearchBar />) }
        </section>
      </header>
    );
  } return null;
}
export default withRouter(Header);

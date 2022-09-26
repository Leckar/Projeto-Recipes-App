import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

const PATHNAMES = ['/meals', '/drinks', '/profile'];

function Footer() {
  const history = useHistory();
  const [isRendering, setIsRendering] = useState(false);
  const { location: { pathname } } = history;

  useEffect(() => {
    if (PATHNAMES.includes(pathname)) {
      setIsRendering(true);
    } else {
      setIsRendering(false);
    }
  }, [pathname]);

  if (isRendering) {
    return (
      <footer
        data-testid="footer"
        className={ styles.footer }
      >
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Ícone de bebidas"
            data-testid="drinks-bottom-btn"
            className={ styles.footerIcon }
          />
        </Link>
        <Link to="/meals">

          <img
            src={ mealIcon }
            alt="Ícone de refeições"
            data-testid="meals-bottom-btn"
            className={ styles.footerIcon }
          />
        </Link>
      </footer>
    );
  } return null;
}

export default withRouter(Footer);

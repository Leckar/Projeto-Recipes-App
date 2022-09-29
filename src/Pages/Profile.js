import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import styles from './Profile.module.css';
import doneIcon from '../images/doneIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';

function Profile() {
  const { email } = (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : '';
  const history = useHistory();
  const userLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main className={ styles.container }>
      <span className={ styles.email } data-testid="profile-email">{ email }</span>
      <div className={ styles.categories }>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
          className={ styles.category }
        >
          <img src={ doneIcon } alt="" />
          <span>Done Recipes</span>
        </button>
        <div className={ styles.line } />
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
          className={ styles.category }
        >
          <img src={ favoriteIcon } alt="" />
          <span>Favorite Recipes</span>
        </button>
        <div className={ styles.line } />
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => userLogout() }
          className={ styles.category }
        >
          <img src={ logoutIcon } alt="" />
          <span>Logout</span>
        </button>
      </div>
    </main>
  );
}

export default withRouter(Profile);

import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';

function Profile() {
  console.log();
  const { email } = (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : '';
  const history = useHistory();
  const userLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <span data-testid="profile-email">{ email }</span>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => userLogout() }
      >
        Logout
      </button>
    </main>
  );
}

export default withRouter(Profile);

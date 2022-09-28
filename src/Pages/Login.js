import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../images/recipesappLogo.svg';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      drinks: {},
    }));
    history.push('/meals');
  };

  const validPasswordAndEmail = () => {
    const lengthValid = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const emailIsValid = validEmail.test(email);
    const valid = password.length > lengthValid && emailIsValid;
    setDisabled(!valid);
  };

  useEffect(() => {
    validPasswordAndEmail();
  }, [email, password]);

  return (
    <main className={ styles.container }>
      <div className={ styles.logo_container }>
        <img className={ styles.logo_image } src={ logo } alt="logo" />
      </div>
      <form className={ styles.form_container } onSubmit={ handleClick }>
        <p>LOGIN</p>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          placeholder="Email"
          onChange={ ({ target }) => setEmail(target.value) }
          className={ styles.form_input }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          placeholder="Password"
          onChange={ ({ target }) => setPassword(target.value) }
          className={ styles.form_input }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          className={ styles.form_button }
        >
          ENTER
        </button>
      </form>
    </main>
  );
}

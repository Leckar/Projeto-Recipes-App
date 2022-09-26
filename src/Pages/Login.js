import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    history.push('/meals');
  };

  const validPasswordAndEmail = () => {
    const lengthValid = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const emailIsValid = validEmail.test(email);
    const valid = password.length > lengthValid && emailIsValid;
    setDisabled(!valid);
    console.log(isDisabled);
  };

  useEffect(() => {
    validPasswordAndEmail();
  }, [email, password]);

  return (
    <div>
      <form onSubmit={ handleClick }>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          placeholder="Digite seu e-mail"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [formData, setData] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setDisabled] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  const validPasswordAndEmail = () => {
    const lengthValid = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const emailIsValid = validEmail.test(formData.email);
    const valid = formData.password.length >= lengthValid && emailIsValid;
    console.log(valid);
    setDisabled(!valid);
  };
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    validPasswordAndEmail();
  };

  return (
    <div>
      <form onSubmit={ handleClick }>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ formData.email }
          placeholder="Digite seu e-mail"
          onChange={ handleChange }
        />
        <input
          name="password"
          type="password"
          value={ formData.password }
          data-testid="password-input"
          onChange={ handleChange }
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

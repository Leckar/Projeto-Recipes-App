import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  return (
    <div>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        value={ email }
        placeholder="Digite seu e-mail"
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        value={ password }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </div>
  );
}

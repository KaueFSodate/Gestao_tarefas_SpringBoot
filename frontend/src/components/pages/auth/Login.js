import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../context/UsuarioContext';
import './Login.css';

function Login() {
  const [usuario, setUsuario] = useState({});
  const { loginUser } = useContext(Context);
  const navigate = useNavigate();

  function handleChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await loginUser(usuario);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Digite a sua senha"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <p>
          Não tem conta? <Link to="/register">Cadastrar</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

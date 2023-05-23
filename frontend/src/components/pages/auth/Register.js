import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../context/UsuarioContext';
import './Register.css';

function Register() {
  const [usuario, setUsuario] = useState({});
  const { register } = useContext(Context);
  const navigate = useNavigate();

  function handleChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(usuario);
      await register(usuario);
      navigate('/login');
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className="ContainerR">
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>
        <input
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          onChange={handleChange}
        />
        <input
          type="text"
          name="nome"
          placeholder="Digite o seu nome"
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Digite a sua senha"
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Register;

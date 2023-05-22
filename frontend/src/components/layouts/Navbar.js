import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './Navbar.css';
import {openNav}  from './script.js';

// Context
import { Context } from '../../context/UsuarioContext';

function Navbar() {
  const { autenticado, logoutUser } = useContext(Context);
  return (
    <nav id="navigation" className="navigation">
      <h1 className="logo" style={{fontFamily: 'Roboto Slab, serif',}}>Gestão de Tarefas📃</h1>
      <ul className="nav-links">
        {autenticado ? (
          <>
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/tarefas/cadastrar" className="nav-link">Cadastrar Tarefas</Link>
            </li>
            <li>
              <Link to="/tarefas/minhastarefas" className="nav-link">Minhas Tarefas</Link>
            </li>
            <li onClick={logoutUser} >
              <Link to="" className="nav-link"> Sair</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">Entrar</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Cadastrar</Link>
            </li>
          </>
        )}
        <li id="threeline-icon" className="threeline-icon" onClick={openNav}>&#9776;</li>
      </ul>
    </nav>
  );
}

export default Navbar;

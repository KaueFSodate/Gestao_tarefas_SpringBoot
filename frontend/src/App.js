import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'

// Pages
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import MinhasTarefas from "./components/pages/tarefas/MinhasTarefas";
import CadastrarTarefa from "./components/pages/tarefas/CadastrarTarefa";
import EditarTarefas from "./components/pages/tarefas/EditarTarefas";
import DetalhesTarefas from "./components/pages/tarefas/DetalhesTarefas";

// Context
import { UsuarioProvider } from "./context/UsuarioContext";

// Flash messages
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <UsuarioProvider>
          <Navbar/>
          <Container>
          <ToastContainer/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="tarefas/cadastrar" element={<CadastrarTarefa/>}/>
              <Route path="tarefas/minhastarefas" element={<MinhasTarefas/>}/>
              <Route path="tarefas/editar/:id" element={<EditarTarefas/>}/>
              <Route path="tarefas/detalhes/:id" element={<DetalhesTarefas/>}/>
            </Routes>
          </Container>
          <Footer/>
        </UsuarioProvider>
      </Router>
    </div>
  );
}

export default App;

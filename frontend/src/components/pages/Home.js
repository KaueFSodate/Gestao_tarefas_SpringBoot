import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import { format, parseISO, isAfter } from 'date-fns';
import './Home.css';

function Home() {
  const [tarefa, setTarefa] = useState([]);
  const [buscarQuery, setBuscarQuery] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('maisRecente');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [proximidadeData, setProximidadeData] = useState('maisProxima');
  const [ativarOrdenacao, setAtivarOrdenacao] = useState(false);

  const [token] = useState(localStorage.getItem('token'));
  const { id } = useParams();

  // Pegar as tarefas pelo id
  useEffect(() => {
    api
      .get(`/api/listarTarefas`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTarefa(response.data);
        console.log(response.data);
      }).catch((error) => {
        // Trate o erro aqui
        console.error("Erro na solicitação:", error);
      });
  }, [token, id]);

  const filteredTarefas = tarefa
    .filter((tarefas) =>
      tarefas.descricao && tarefas.descricao.toLowerCase().includes(buscarQuery.toLowerCase())
    )
    .filter((tarefas) => (categoria ? tarefas.categoria === categoria : true))
    .filter((tarefas) => (status ? tarefas.status === status : true))
    .filter((tarefas) => (prioridade ? tarefas.prioridade === prioridade : true))
    .sort((a, b) => {
      if (ordenarPor === 'maisRecente') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (ativarOrdenacao) {
    filteredTarefas.sort((a, b) => {
      const dataConclusaoA = parseISO(a.dataConclusao);
      const dataConclusaoB = parseISO(b.dataConclusao);

      if (proximidadeData === 'maisProxima') {
        return dataConclusaoA - dataConclusaoB;
      } else {
        return dataConclusaoB - dataConclusaoA;
      }
    });
  }

  function handleSearch(e) {
    setBuscarQuery(e.target.value);
  }

  function handleOrdenarPor(e) {
    setOrdenarPor(e.target.value);
  }

  function handleCategoria(e) {
    setCategoria(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handlePrioridade(e) {
    setPrioridade(e.target.value);
  }

  function handleProximidadeData(e) {
    setProximidadeData(e.target.value);
  }

  function handleAtivarOrdenacao(e) {
    setAtivarOrdenacao(e.target.checked);
  }

  return (
    <div style={{overflowX: 'auto'}}>
      <h2 style={{ color: '#1C5D99', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', marginTop: '20px' }}>DashBoard</h2>
      <p style={{ color: '#444', fontSize: '16px' }}>Veja os detalhes de cada tarefa</p>

      <label htmlFor="ordenarPor">Ordenar por:</label>
      <select id="ordenarPor" value={ordenarPor} onChange={handleOrdenarPor}>
        <option value="maisRecente">Mais recente</option>
        <option value="menosRecente">Menos recente</option>
      </select>

      <table>
        <thead>
          <tr>
            <th className="setor">
              <label>Setor</label>
              <select id="setor" value={categoria} onChange={handleCategoria}>
                <option value="">Todos</option>
                <option value="Marketing">Marketing</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Vendas">Vendas</option>
                <option value="Tecnologia">Tecnologia</option>
              </select>
            </th>

            <th className="prioridade">
              <label>Prioridade</label>
              <select id="prioridade" value={prioridade} onChange={handlePrioridade}>
                <option value="">Todos</option>
                <option value="Baixa">Baixa</option>
                <option value="Media">Média</option>
                <option value="Alta">Alta</option>
                <option value="Muito alta">Muito alta</option>
              </select>
            </th>

            <th className="status">
              <label>Status</label>
              <select id="status" value={status} onChange={handleStatus}>
                <option value="">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluida">Concluída</option>
              </select>
            </th>

            <th className="proximidadeData">
              <label>Conclusão</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <select id="proximidadeData" value={proximidadeData} onChange={handleProximidadeData}>
                    <option value="maisProxima">Mais próxima da data de conclusão</option>
                    <option value="maisDistante">Menos próxima da data de conclusão</option>
                </select>
                <input type="checkbox" checked={ativarOrdenacao} onChange={handleAtivarOrdenacao} />
              </div>
            </th>

            <th className="buscar">
              <label>Pesquisar</label>
              <input
                type="text"
                placeholder="Pesquisar tarefas"
                value={buscarQuery}
                onChange={handleSearch}
              />
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTarefas.length > 0 ? (
            filteredTarefas.map((tarefas) => (
              <tr key={tarefas.id}>
                <td>{tarefas.categoria}</td>
                <td>{tarefas.prioridade}</td>
                <td>{tarefas.status}</td>
                <td>{tarefas.dataConclusao.slice(8, 10)}/{tarefas.dataConclusao.slice(5, 7)}/{tarefas.dataConclusao.slice(0, 4)}</td>
                <td>{tarefas.titulo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Não há tarefas cadastradas ou disponíveis!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

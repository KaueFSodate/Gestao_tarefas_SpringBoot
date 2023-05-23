import React from 'react'
import api from "../../../utils/api";
import {useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { format } from 'date-fns';
import "./DetalhesTarefas.css"


function DetalhesTarefas() {
    const [tarefa, setTarefa] = useState({})
    const [token] = useState(localStorage.getItem('token'))
    const { id } = useParams()

    // Pegar as tarefas pelo id
    useEffect(() => {
        api.get(`api/listarTarefa/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setTarefa(response.data)
            console.log(response.data)
          })
      }, [token, id])

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
      };
      

      return (
        <div>
          <h1 style={{marginTop: '20px'}}>Detalhes da tarefa</h1>
          {Object.keys(tarefa).length > 0 ? (
            <div className='containerDetalhes'>
              <h3>{tarefa.titulo}</h3>
              <p>Descrição<br></br> {tarefa.descricao}</p>
              <hr></hr>
              <p>Prioridade<br></br> {tarefa.prioridade}</p>
              <hr></hr>
              <p>Status<br></br> {tarefa.status}</p>
              <hr></hr>
              <p>Observação<br></br> {tarefa.observacao}</p>
              <hr></hr>
              <p>Data de conclusão<br />{tarefa.dataConclusao.slice(8, 10)}/{tarefa.dataConclusao.slice(5, 7)}/{tarefa.dataConclusao.slice(0, 4)}</p>
              <hr></hr>
              <p>Data de criação<br /> {formatDate(tarefa.createdAt)}</p>

              <hr></hr>
              <p>Categoria<br></br> {tarefa.categoria}</p>
              <hr></hr>

      
            </div>
          ) : (
            <p>Não há tarefas cadastradas ou disponíveis!</p>
          )}
        </div>
      );
}

export default DetalhesTarefas

import api from "../../../utils/api";
import {useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MinhasTarefas.css"

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function MinhasTarefas() {
    const [tarefas, setTarefas] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    // Pegar os produtos da API
    useEffect(() => {
        api.get('/api/listarTarefas', {
            // Mandar o token para o headers
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`
              }
          }).then((response) => {
            console.log(response.data)
            setTarefas(response.data)
          })
    
    
        }, [token])

        async function removeTarefa(id) {


            await api.delete(`/api/deletarTarefa/${id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              const updatedTarefas = tarefas.filter((tarefa) => tarefa.id != id)
              setTarefas(updatedTarefas)
              toast.success('Tarefa excluída com sucesso!')
              return response.data
            })
            .catch((err) => {
              console.log(err)
            })
          }
  return (
    <div>
        <h1 style={{marginTop: '20px'}}>Minhas Tarefas</h1>
        <p>Veja os detalhes de cada uma</p>

        {tarefas.length > 0 &&
                tarefas.map((tarefa) => (
                    <div key={tarefa.id} className="containerMinhas">
                          <h3>{tarefa.titulo}</h3>
                          <div className="ContainerB">
                            <Link to={`/tarefas/detalhes/${tarefa.id}`} className="Link">Mais detalhes</Link>
                              <button onClick={() => {
                                navigate(`/tarefas/editar/${tarefa.id}`);
                              }}className="EditarButton">Editar</button>
                              <button
                                onClick={() => {
                                    removeTarefa(tarefa.id)
                                  }}
                              className="ExcluirButton">
                              Excluir
                              </button>
                          </div>
                    </div> 
                                
        ))}
        {tarefas.length === 0 && (
                <p>Não há tarefas cadastradas!</p>
        )}
      </div>
      
  )
}

export default MinhasTarefas

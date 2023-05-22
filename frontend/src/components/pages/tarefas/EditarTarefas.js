import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


// utils
import api from '../../../utils/api'

function EditarTarefas() {
    const [tarefa, setTarefa] = useState({})
    const [token] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()
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
        })
    }, [token, id])

    // Pegar os valores dos inputs
    function handleChange(e) {

      
        setTarefa({...tarefa, [e.target.name]: e.target.value})
        console.log(tarefa)
    }


    // Função para cadastrar a vaga
    async function handleEdit(e){
        e.preventDefault()

        // Converter a data para formato ISO
        const isoDateConclusao = new Date(tarefa.dataConclusao).toISOString();

        // Atualizar o valor de dataConclusao com o formato ISO
        const tarefaFormatada = { ...tarefa, dataConclusao: isoDateConclusao };

    
        await api.put(`api/editarTarefa/${id}`, tarefaFormatada, {
            headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
            },
        })
        .then((response) => {
            toast.success('Tarefa editada com sucesso!')
            navigate('/')
            return response.data
        })
        .catch((err) => {
            toast.error(err.response.data)
            return err.response.data
        })

        
    }

  return (
    <div>
                <h1 style={{marginTop: '20px'}}>Editar Tarefa</h1>
            <div className='container'>
              <form onSubmit={handleEdit}>
                <div className='containerForm'>
                  <label>Título: </label>
                  <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o titulo da tarefa"
                  onChange={handleChange}
                  value={tarefa.titulo || ""}
                  />
                  <label>Descrição: </label>
                  <input
                  type="text"
                  name="descricao"
                  placeholder="Digite o nome da vaga"
                  onChange={handleChange}
                  value={tarefa.descricao || ""}
                  />
                  <label>Prioridade: </label>
                  <input
                  type="text"
                  name="prioridade"
                  placeholder="Digite a prioridade da tarefa"
                  onChange={handleChange}
                  value={tarefa.prioridade || ""}
                  />
                  <label>Status: </label>
                  <select name="status" onChange={handleChange} value={tarefa.status || ""}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluida">Concluida</option>
                  </select>
                  <label>Categoria: </label>
                  <select name="categoria" onChange={handleChange} value={tarefa.categoria || ""}>
                    <option value="Marketing">Marketing</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Tecnologia">Tecnologia</option>
                  </select>
                  <label>Observação: </label>
                  <input
                  type="text"
                  name="observacao"
                  placeholder="Digite a observação da tarefa"
                  onChange={handleChange}
                  value={tarefa.observacao || ""}
                  />
                  <label>Previsão de conclusão: </label>
                  <input
                  type="date"
                  name="dataConclusao"
                  placeholder="Digite a previsão de conclusão da tarefa"
                  onChange={handleChange}
                  value={tarefa.dataConclusao || ""}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit">Editar tarefa</button>
                  </div>
                  
                </div>
              </form>
            </div>
            </div>
  )
}

export default EditarTarefas
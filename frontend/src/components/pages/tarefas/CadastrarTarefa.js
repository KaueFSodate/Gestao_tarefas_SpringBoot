import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CadastrarTarefas.css"

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


// utils
import api from '../../../utils/api'

function CadastrarTarefa() {
    const [tarefa, setTarefa] = useState({
      prioridade: "Baixa",
      status: "Pendente",
      categoria: "Marketing",
      dataConclusao: new Date().toISOString().split('T')[0]
    })
    const [token] = useState(localStorage.getItem('token'))
    const [previsaoConclusao, setPrevisaoConclusao] = useState(new Date().toISOString().split('T')[0]);
    const navigate = useNavigate()

    

    // Pegar os valores dos inputs
    function handleChange(e) {
        setTarefa({...tarefa, [e.currentTarget.name]: e.currentTarget.value})
        console.log(tarefa)
    }



    // Função para cadastrar a vaga
    async function handleSubmit(e){
        e.preventDefault()

        // Converter a data para formato ISO
        const isoDateConclusao = new Date(tarefa.dataConclusao).toISOString();

        // Atualizar o valor de dataConclusao com o formato ISO
        const tarefaFormatada = { ...tarefa, dataConclusao: isoDateConclusao };

    
        await api.post(`api/cadastrarTarefa`, tarefaFormatada, {
            headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
            },
        })
        .then((response) => {
            console.log(response.data)
            toast.success('Tarefa cadastrada com sucesso!')
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
                <h1 style={{marginTop: '20px'}}>Cadastrar Tarefa</h1>
            <div className='container'>
              <form onSubmit={handleSubmit}>
                <div className='containerForm'>
                <label>Título: </label>
                  <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o titulo da tarefa"
                  onChange={handleChange}
                  />
                  <label>Descrição: </label>
                  <input
                  type="text"
                  name="descricao"
                  placeholder="Digite a descrição da tarefa"
                  onChange={handleChange}
                  />
                  <label>Prioridade: </label>
                  <select name="prioridade" onChange={handleChange}>
                    <option value="Baixa">Baixa</option>
                    <option value="Media">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Muito alta">Muito alta</option>
                  </select>
                  <label>Status: </label>
                  <select name="status" onChange={handleChange}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluida">Concluida</option>
                  </select>
                  <label>Categoria: </label>
                  <select name="categoria" onChange={handleChange}>
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
                  />

                  <label>Previsão de conclusão: </label>
                  <input
                  type="date"
                  name="dataConclusao"
                  value={tarefa.dataConclusao}
                  placeholder="Digite a previsão de conclusão da tarefa"
                  onChange={handleChange}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit">Cadastrar</button>
                  </div>
                  
                </div>
              </form>
            </div>
            </div>
  )
}

export default CadastrarTarefa

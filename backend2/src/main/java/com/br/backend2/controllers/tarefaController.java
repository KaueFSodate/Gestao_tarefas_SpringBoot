package com.br.backend2.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend2.models.entity.Tarefa;
import com.br.backend2.models.entity.usuario;
import com.br.backend2.models.repository.TarefaRepository;
import com.br.backend2.security.TokenService;

@RestController
@RequestMapping("/api")
public class tarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private TokenService tokenService;

    
    @GetMapping("/listarTarefas")
    public ResponseEntity<List<Tarefa>> listar(@RequestHeader("Authorization") String authorizationHeader) {
        // Extrair o token do cabeçalho
        String token = authorizationHeader.replace("Bearer ", "");

        // Obter o nome de usuário a partir do token
        int usuario_id = tokenService.getClientIdFromToken(token);

        // Consultar as tarefas do cliente no banco de dados
        List<Tarefa> tarefa = tarefaRepository.FindByUsuarioId(usuario_id);

        // Retornar as tarefas em formato JSON na resposta
        return ResponseEntity.ok(tarefa);
    }

    @PostMapping("/cadastrarTarefa")
        public ResponseEntity<?> cadastrar(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Tarefa tarefa) {
        // Extrair o token do cabeçalho
        String token = authorizationHeader.replace("Bearer ", "");

        // Verificar se o título da tarefa foi fornecido
        if (tarefa.getTitulo() == null || tarefa.getTitulo().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O título não foi inserido");
        }

        // Verificar se a descrição da tarefa foi fornecida
        if (tarefa.getDescricao() == null || tarefa.getDescricao().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A descrição não foi inserida");
        }

        // Verificar se a data de conclusão da tarefa foi fornecida
        if (tarefa.getDataConclusao() == null || tarefa.getDataConclusao().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A data de conclusão não foi inserida");
        }

        // Verificar se a prioridade da tarefa foi fornecida
        if (tarefa.getPrioridade() == 0) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A prioridade não foi inserida");
        }

        // Verificar se a categoria da tarefa foi fornecida
        if (tarefa.getCategoria() == null || tarefa.getCategoria().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A categoria não foi inserida");
        }

        // Verificar se o status da tarefa foi fornecido
        if (tarefa.getStatus() == null || tarefa.getStatus().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O status não foi inserido");
        }

        if (tarefa.getObservacao() == null || tarefa.getObservacao().isEmpty()){
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A observação não foi inserida");
        }

        // Obter o nome de usuário a partir do token
        int usuario_id = tokenService.getClientIdFromToken(token);

        // Definir o usuário da tarefa
        usuario Usuario = new usuario();
        Usuario.setId(usuario_id);
        tarefa.setUsuario(Usuario);

        // Salvar a tarefa do usuário
        tarefaRepository.save(tarefa);

        // Obter todas as tarefas do usuário em formato JSON
        List<Tarefa> tarefas = tarefaRepository.FindByUsuarioId(usuario_id);

        // Retornar as tarefas em formato JSON na resposta
        return ResponseEntity.ok(tarefas);
    }



    @GetMapping("/listarTarefa/{id}")
    public ResponseEntity<Tarefa> listarTarefaId(@PathVariable int id) {


        Optional<Tarefa> tarefaOptional = tarefaRepository.findById(id);

        Tarefa tarefa = tarefaOptional.get();
        return ResponseEntity.ok(tarefa);
        }

    @PutMapping("/editarTarefa/{id}")
    public ResponseEntity<?> editar(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int id, @RequestBody Tarefa tarefa) {
        // Extrair o token do cabeçalho
        String token = authorizationHeader.replace("Bearer ", "");

        // Obter o nome de usuário a partir do token
        int usuario_id = tokenService.getClientIdFromToken(token);

        // Verificar se a tarefa existe no banco de dados
        Optional<Tarefa> tarefaEdit = tarefaRepository.findById(id);

        // Obter a tarefa do Optional
        Tarefa tarefaExistente = tarefaEdit.get();

        // Verificar se a tarefa pertence ao usuário antes de editar
        if (tarefaExistente.getUsuario().getId() != usuario_id) {
            // Retornar um código de status HTTP 401 (UNAUTHORIZED) se a tarefa não pertencer ao usuário
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Verificar se o título da tarefa foi fornecido
        if (tarefa.getTitulo() == null || tarefa.getTitulo().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O título não foi inserido");
        }

        // Verificar se a descrição da tarefa foi fornecida
        if (tarefa.getDescricao() == null || tarefa.getDescricao().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A descrição não foi inserida");
        }

        // Verificar se a data de conclusão da tarefa foi fornecida
        if (tarefa.getDataConclusao() == null || tarefa.getDataConclusao().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A data de conclusão não foi inserida");
        }

        // Verificar se a prioridade da tarefa foi fornecida
        if (tarefa.getPrioridade() == 0) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A prioridade não foi inserida");
        }

        // Verificar se a categoria da tarefa foi fornecida
        if (tarefa.getCategoria() == null || tarefa.getCategoria().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A categoria não foi inserida");
        }

        // Verificar se o status da tarefa foi fornecido
        if (tarefa.getStatus() == null || tarefa.getStatus().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O status não foi inserido");
        }

        if (tarefa.getObservacao() == null || tarefa.getObservacao().isEmpty()){
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A observação não foi inserida");
        }

        // Atualizar os campos da tarefa existente com os valores da tarefa recebida
        tarefaExistente.setTitulo(tarefa.getTitulo());
        tarefaExistente.setDescricao(tarefa.getDescricao());
        tarefaExistente.setPrioridade(tarefa.getPrioridade());
        tarefaExistente.setStatus(tarefa.getStatus());
        tarefaExistente.setCategoria(tarefa.getCategoria());
        tarefaExistente.setDataConclusao(tarefa.getDataConclusao());

        // Definir o usuário da tarefa
        usuario Usuario = new usuario();
        Usuario.setId(usuario_id);
        tarefaExistente.setUsuario(Usuario);



        // Salvar a tarefa editada no banco de dados
        tarefaRepository.save(tarefaExistente);


        // Obter todas as tarefas do usuário em formato JSON
        List<Tarefa> tarefas = tarefaRepository.FindByUsuarioId(usuario_id);

        // Retornar as tarefas em formato JSON na resposta
        return ResponseEntity.ok(tarefas);
    }

    @DeleteMapping("/deletarTarefa/{id}")
    public ResponseEntity<List<Tarefa>> deletar(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int id) {
        // Extrair o token do cabeçalho
        String token = authorizationHeader.replace("Bearer ", "");
        
        // Obter o id do usuário a partir do token
        int usuario_id = tokenService.getClientIdFromToken(token);

        // Verificar se a tarefa existe no banco de dados
        Optional<Tarefa> tarefaExistente = tarefaRepository.findById(id);
        if (tarefaExistente.isEmpty()) {
            // Retornar um código de status HTTP 404 (NOT FOUND) se a tarefa não for encontrada
            return ResponseEntity.notFound().build();
        }

        // Obter a tarefa do Optional
        Tarefa tarefaReal = tarefaExistente.get();

        // Verificar se a tarefa pertence ao usuário antes de deletar
        if (tarefaReal.getUsuario().getId() != usuario_id) {
            // Retornar um código de status HTTP 401 (UNAUTHORIZED) se a tarefa não pertencer ao usuário
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Deletar a tarefa do banco de dados
        tarefaRepository.delete(tarefaReal);

        // Obter todas as tarefas do usuário em formato JSON
        List<Tarefa> tarefas = tarefaRepository.FindByUsuarioId(usuario_id);

        // Retornar as tarefas em formato JSON na resposta
        return ResponseEntity.ok(tarefas);
}
    
        
}

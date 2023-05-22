package com.br.backend2.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.backend2.models.entity.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {

    // Query para buscar pelo id
    @Query(value = "SELECT * FROM tarefa WHERE usuario_id = :usuario_id", nativeQuery = true)
    List<Tarefa> FindByUsuarioId(int usuario_id);

}

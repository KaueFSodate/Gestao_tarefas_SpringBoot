package com.br.backend2.models.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.backend2.models.entity.usuario;

@Repository
public interface usuarioRepository extends JpaRepository<usuario, Integer>{
    
    // Query para buscar pelo email
    @Query(value = "SELECT *FROM usuario WHERE email = :email", nativeQuery = true)
    usuario findByEmail(String email);

    // Query para buscar pelo nome
    @Query(value = "SELECT *FROM usuario WHERE nome = :nome", nativeQuery = true)
    usuario findByUsername(String nome);

    // Query para buscar pelo id
    @Query(value = "SELECT *FROM usuario WHERE id = :id", nativeQuery = true)
    Optional<usuario> FindByIDTop(int id);

    // Query para buscar pelo nome e nascimento
    @Query(value = "SELECT *FROM usuario WHERE email = :email AND senha = :senha", nativeQuery = true)
    Optional<usuario> FindByEmailAndSenha(String email, String senha);

}
package com.br.backend2.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend2.models.entity.Login;
import com.br.backend2.models.entity.usuario;
import com.br.backend2.models.repository.usuarioRepository;
import com.br.backend2.security.TokenService;


@RestController
@RequestMapping("/api")
public class usuarioController {

    @Autowired
    private usuarioRepository UsuarioRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;



    // Cadastrar os clientes
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody usuario Usuario){
        try{

            // Verificar se o e-mail foi fornecido
            if (Usuario.getNome() == null || Usuario.getNome().isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O nome não foi inserido");
            }

            // Verificar se o e-mail foi fornecido
            if (Usuario.getEmail() == null || Usuario.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O e-mail não foi inserido");
            }

            // Verificar se a senha foi fornecida
            if (Usuario.getSenha() == null || Usuario.getSenha().isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A senha não foi inserida");
            }

            String senhaCriptografada = passwordEncoder.encode(Usuario.getSenha());
            Usuario.setSenha(senhaCriptografada);
            usuario UsuarioT = (usuario) UsuarioRepository.save(Usuario);
            String token = tokenService.gerarToken(UsuarioT);
            return ResponseEntity.ok(token);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao se cadastrar, tente novamente!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        try {
            // Verificar se o e-mail foi fornecido
        if (login.email() == null || login.email().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("O e-mail não foi inserido");
        }

        // Verificar se a senha foi fornecida
        if (login.senha() == null || login.senha().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("A senha não foi inserida");
        }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.email(), login.senha()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            usuario UsuarioT = (usuario) authentication.getPrincipal();

            String token = tokenService.gerarToken(UsuarioT);

            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Usuário ou senha inválido!");
        }
    }


    // Deletar os clientes
    @DeleteMapping("/deletar{id}")
    public void deletar(@RequestParam int id){
        UsuarioRepository.deleteById(id);
    }

    // Editar os clientes
    @PutMapping("/editar")
    public void Editar(usuario Usuario){
        UsuarioRepository.save(Usuario);
    }

    
}

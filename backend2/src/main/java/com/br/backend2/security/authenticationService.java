package com.br.backend2.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.br.backend2.models.repository.usuarioRepository;

@Service
public class authenticationService implements UserDetailsService{

    @Autowired
    private usuarioRepository UsuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return UsuarioRepository.findByEmail(username);
    }
    
}

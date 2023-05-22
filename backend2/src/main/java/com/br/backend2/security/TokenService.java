package com.br.backend2.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.br.backend2.models.entity.usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    // Gerador da chave
    private static final String SECRET_KEY = "2A462D4A614E645267556B58703273357538782F413F4428472B4B6250655368";

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String gerarToken(usuario Usuario) {

        return Jwts.builder()
        .setSubject(Usuario.getUsername()) // Defina o subject (assunto) do token como o email do usuário
        .claim("id", Usuario.getId()) // Adicione um claim (informação adicional) com o ID do usuário
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // Defina a data de expiração do token (7 dias a partir de agora)
        .signWith(getSignInKey(), SignatureAlgorithm.HS256) // Assine o token com o algoritmo HMAC e a chave secreta
        .compact();

    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    
        return claims.getSubject();
    }

    public int getClientIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    
            int id = Integer.parseInt(claims.get("id").toString());
            return id;
    }
    
}

package com.virtualstore.backend.security.jwt;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.virtualstore.backend.entity.Person;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtil {

    private String secretKey = "4pJxhJ3pe8kTamQUCJ1oVs3nBHHS13b7bhxHChm5jf4=";

    private int tokenValidity = 900000;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public String generateTokenUsername(Person person) {
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(issuedAt.getTime() + tokenValidity);

        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));

        return Jwts.builder()
                .subject(person.getUsername())
                .issuedAt(issuedAt)
                .expiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public String getEmailToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean tokenValidation(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Assinatura inválida", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token expirado", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token não suportado", e.getMessage());
        }

        return false;
    }

}

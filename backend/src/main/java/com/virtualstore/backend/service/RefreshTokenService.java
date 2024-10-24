package com.virtualstore.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.entity.RefreshToken;
import com.virtualstore.backend.repository.PersonRepository;
import com.virtualstore.backend.repository.RefreshTokenRepository;
import com.virtualstore.backend.security.jwt.JwtUtil;

import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public RefreshToken createRefreshToken(Person person) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setPerson(person);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(new Date((new Date()).getTime() + jwtUtil.getRefreshExpirationMs()));
        
        Person personByEmail = personRepository.findByEmail(person.getUsername());
        
        RefreshToken oldRefresh = this.findByUserId(personByEmail.getId());

        if (oldRefresh == null) {
            refreshTokenRepository.save(refreshToken);
        } else {
            oldRefresh.setToken(refreshToken.getToken());
            oldRefresh.setExpiryDate(refreshToken.getExpiryDate());
            refreshTokenRepository.saveAndFlush(oldRefresh);
        }

        return refreshToken;
    }

    public boolean isRefreshTokenExpired(RefreshToken refreshToken) {
        return refreshToken.getExpiryDate().before(new Date());
    }

    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken findByUserId(Long id) {
        return refreshTokenRepository.findById(id).get();
    }

    public boolean isValid(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken);
        return token != null && !isRefreshTokenExpired(token);
    }

    public Person getUsernameFromRefreshToken(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken);
        return token != null ? token.getPerson() : null;
    }

    @Transactional
    public void deleteByPerson(Person person) {
        refreshTokenRepository.deleteByPerson(person);
    }
}

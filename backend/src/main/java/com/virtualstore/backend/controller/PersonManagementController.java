package com.virtualstore.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.dto.LoginResponseDTO;
import com.virtualstore.backend.dto.PersonPasswordRequestDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.security.jwt.JwtUtil;
import com.virtualstore.backend.service.PersonManagementService;
import com.virtualstore.backend.service.RefreshTokenService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/management")
public class PersonManagementController {

    @Autowired
    private PersonManagementService personManagementService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/password-code")
    public String recoveryCode(@RequestBody Person person) {
        String personEmail = person.getEmail();

        return personManagementService.requestCode(personEmail);
    }

    @PostMapping("/password-change")
    public String changePassword(@RequestBody PersonPasswordRequestDTO personPassword) {

        return personManagementService.passwordChange(personPassword);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Person person) {
        String email = person.getEmail();
        String password = person.getPassword();

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Person authenticatedPerson = (Person) authentication.getPrincipal();

        String accessToken = jwtUtil.generateTokenUsername(authenticatedPerson);

        refreshTokenService.createRefreshToken(authenticatedPerson);

        accessToken = "Bearer " + accessToken;

        return ResponseEntity.ok(new LoginResponseDTO(accessToken));
    }

}

package com.virtualstore.backend.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.dto.LoginResponseDTO;
import com.virtualstore.backend.dto.PersonPasswordRequestDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.PersonRepository;
import com.virtualstore.backend.security.jwt.JwtUtil;

@Service
public class PersonManagementService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RefreshTokenService refreshTokenService;

    public String requestCode(String email) {

        Person person = personRepository.findByEmail(email);

        Long personId = person.getId();
        String recoveryCode = getRecoverPasswordCode(personId);

        person.setRecoverPasswordCode(recoveryCode);
        person.setSendCodeDate(new Date());

        personRepository.saveAndFlush(person);

        Map<String, Object> properties = new HashMap<>();

        String linkRecoveryCode = "http://localhost:3000/new-password?email=" + email + "&code=" + recoveryCode;

        properties.put("name", person.getName());
        properties.put("recoveryCode", linkRecoveryCode);

        emailService.sendTemplateEmail(person.getEmail(), "Código de Recuperação de Senha", properties,
                "email-recovery-code.flth");

        return "Código enviado!";
    }

    public String passwordChange(PersonPasswordRequestDTO personPasswordRequestDTO) {
        String personRequestEmail = personPasswordRequestDTO.getEmail();
        String personRequestCode = personPasswordRequestDTO.getRecoverPasswordCode();
        String personRequestPassword = personPasswordRequestDTO.getPassword();

        Person personDb = personRepository.findByEmailAndRecoverPasswordCode(personRequestEmail, personRequestCode);

        if (personDb == null)
            return "Email ou código não encontrado!";

        Long variationTime = new Date().getTime() - personDb.getSendCodeDate().getTime();
        Date variation = new Date(variationTime);

        Boolean expireTime = variation.getTime() / 1000 < 900;

        if (expireTime) {
            personDb.setPassword(passwordEncoder.encode(personRequestPassword));
            personDb.setRecoverPasswordCode(null);
            personRepository.saveAndFlush(personDb);

            emailService.sendTextEmail(personRequestEmail, "Alteração de Senha",
                    "Olá, a sua  senha foi alterada com sucesso!");

            return "Senha alterada com sucesso!";
        } else {
            return "Tempo Expirado, solicite um novo código";
        }
    }

    public ResponseEntity<?> login(Person person) {
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

    private String getRecoverPasswordCode(Long id) {
        DateFormat format = new SimpleDateFormat("ddMMyyyyHHmmssmm");
        return format.format(new Date()) + id;
    }
}

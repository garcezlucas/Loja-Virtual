package com.virtualstore.backend.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.dto.PersonPasswordRequestDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonManagementService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String requestCode(String email) {

        Person person = personRepository.findByEmail(email);

        Long personId = person.getId();
        String recoveryCode = getRecoverPasswordCode(personId);

        person.setRecoverPasswordCode(recoveryCode);
        person.setSendCodeDate(new Date());

        personRepository.saveAndFlush(person);

        Map<String, Object> properties = new HashMap<>();

        properties.put("name", person.getName());
        properties.put("recoveryCode", recoveryCode);

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

            return "Senha alterado com sucesso!";
        } else {
            return "Tempo Expirado, solicite um novo código";
        }
    }

    private String getRecoverPasswordCode(Long id) {
        DateFormat format = new SimpleDateFormat("ddMMyyyyHHmmssmm");
        return format.format(new Date()) + id;
    }
}

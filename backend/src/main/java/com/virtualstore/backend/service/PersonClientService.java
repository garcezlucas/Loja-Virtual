package com.virtualstore.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.Validators.Validator;
import com.virtualstore.backend.dto.PersonClientRequestDTO;
import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonClientRepository;

@Service
public class PersonClientService {

    @Autowired
    PersonClientRepository personClientRepository;

    @Autowired
    PersonPermissionService personPermissionService;

    @Autowired
    EmailService emailService;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    PersonExistenceService personExistenceService;

    @Autowired
    @Qualifier("cpfValidator") 
    Validator<String> cpfValidator;

    @Autowired
    @Qualifier("emailValidator")
    Validator<String> emailValidator;

    public Person create(PersonClientRequestDTO personClientRequestDTO) {

        cpfValidator.validate(personClientRequestDTO.getCpf());
        emailValidator.validate(personClientRequestDTO.getEmail());

        personExistenceService.checkEmailExists(personClientRequestDTO.getEmail());
        personExistenceService.checkCpfExists(personClientRequestDTO.getCpf());

        City city = cityRepository.findById(personClientRequestDTO.getCity().getId())
                .orElseThrow(() -> new IllegalArgumentException("Cidade inválida!"));

        Person person = personClientRequestDTO.converter(personClientRequestDTO);
        person.setCreationDate(new Date());
        person.setCity(city);

        Person newPerson = personClientRepository.saveAndFlush(person);
        personPermissionService.linkClientPersonPermission(newPerson);

        // emailService.sendTextEmail(newPerson.getEmail(), "Cadastro na Loja Virtual",
        // "O registro na loja foi realizado com sucesso. Em breve você receberá a senha
        // de acesso por e-mail.");

        Map<String, Object> properties = new HashMap<>();

        properties.put("name", newPerson.getName());
        properties.put("email", newPerson.getEmail());

        emailService.sendTemplateEmail(newPerson.getEmail(), "Cadastro na Loja Virtual", properties,
                "email-register-user.flth");

        return newPerson;
    }
}

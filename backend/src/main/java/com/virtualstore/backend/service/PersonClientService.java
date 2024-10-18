package com.virtualstore.backend.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.virtualstore.backend.Validators.PersonExistenceService;
import com.virtualstore.backend.Validators.Validator;
import com.virtualstore.backend.dto.PersonClientRequestDTO;
import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonClientRepository;

@Service
public class PersonClientService {

    private final PersonClientRepository personClientRepository;
    private final PersonPermissionService personPermissionService;
    private final EmailService emailService;
    private final CityRepository cityRepository;
    private final PersonExistenceService personExistenceService;
    private final Validator<String> cpfValidator;
    private final Validator<String> emailValidator;

    public PersonClientService(PersonClientRepository personClientRepository,
            PersonPermissionService personPermissionService,
            EmailService emailService,
            CityRepository cityRepository,
            PersonExistenceService personExistenceService,
            Validator<String> cpfValidator,
            Validator<String> emailValidator) {
        this.personClientRepository = personClientRepository;
        this.personPermissionService = personPermissionService;
        this.emailService = emailService;
        this.cityRepository = cityRepository;
        this.personExistenceService = personExistenceService;
        this.cpfValidator = cpfValidator;
        this.emailValidator = emailValidator;
    }

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

        emailService.sendTextEmail(newPerson.getEmail(), "Cadastro na Loja Virtual",
                "O registro na loja foi realizado com sucesso. Em breve você receberá a senha de acesso por e-mail.");

        return newPerson;
    }
}

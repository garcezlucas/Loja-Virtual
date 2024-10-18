package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.virtualstore.backend.Validators.PersonExistenceService;
import com.virtualstore.backend.Validators.Validator;
import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final CityRepository cityRepository;
    private final PersonExistenceService personExistenceService;
    private final Validator<String> cpfValidator;
    private final Validator<String> emailValidator;

    public PersonService(PersonRepository personRepository,
            CityRepository cityRepository,
            PersonExistenceService personExistenceService,
            Validator<String> cpfValidator,
            Validator<String> emailValidator) {
        this.personRepository = personRepository;
        this.cityRepository = cityRepository;
        this.personExistenceService = personExistenceService;
        this.cpfValidator = cpfValidator;
        this.emailValidator = emailValidator;
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Person create(Person person) {
        cpfValidator.validate(person.getCpf());
        emailValidator.validate(person.getEmail());

        personExistenceService.checkEmailExists(person.getEmail());
        personExistenceService.checkCpfExists(person.getCpf());

        City city = cityRepository.findById(person.getCity().getId())
                .orElseThrow(() -> new IllegalArgumentException("Cidade inválida!"));

        person.setCreationDate(new Date());
        person.setCity(city);

        return personRepository.saveAndFlush(person);
    }

    public Person update(Person person) {
        person.setUpdateDate(new Date());
        return personRepository.saveAndFlush(person);
    }

    public void remove(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pessoa não encontrada!"));
        personRepository.delete(person);
    }
}

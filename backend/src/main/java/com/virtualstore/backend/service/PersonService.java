package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.Validators.Validator;
import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    PersonPermissionService personPermissionService;

    @Autowired
    EmailService emailService;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    PersonExistenceService personExistenceService;

    @Autowired
    Validator<String> cpfValidator;

    @Autowired
    Validator<String> emailValidator;

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
        Person existingPerson = personRepository.findById(person.getId())
                .orElseThrow(() -> new IllegalArgumentException("Pessoa inválido!"));
        Date createDate = existingPerson.getCreationDate();

        person.setCreationDate(createDate);
        person.setUpdateDate(new Date());
        return personRepository.saveAndFlush(person);
    }

    public void remove(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pessoa não encontrada!"));
        personRepository.delete(person);
    }
}

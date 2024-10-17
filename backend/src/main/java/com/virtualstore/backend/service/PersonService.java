package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CityRepository cityRepository;

    private static final String CPF_PATTERN = "\\d{11}";
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Person create(Person person) {

        if (!isValidCPF(person.getCpf())) {
            throw new IllegalArgumentException("CPF inválido!");
        }

        if (!isValidEmail(person.getEmail())) {
            throw new IllegalArgumentException("Email inválido!");
        }

        if (personRepository.existsByEmail(person.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }

        if (personRepository.existsByCpf(person.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }

        Long cityId = person.getCity().getId();

        Optional<City> cityOpt = cityRepository.findById(cityId);

        person.setCreationDate(new Date());

        Person newPerson = personRepository.saveAndFlush(person);

        Person returnPerson = newPerson;
        returnPerson.setCity(cityOpt.get());

        return returnPerson;
    }

    public Person update(Person person) {
        person.setUpdateDate(new Date());

        Person updatePerson = personRepository.saveAndFlush(person);

        return updatePerson;
    }

    public void remove(Long id) {
        Person person = personRepository.findById(id).get();

        personRepository.delete(person);
    }

    private boolean isValidCPF(String cpf) {
        if (cpf == null || !cpf.matches(CPF_PATTERN)) {
            return false;
        }

        return true;
    }

    private boolean isValidEmail(String email) {
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            return false;
        }
        return true;
    }
}

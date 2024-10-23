package com.virtualstore.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonExistenceService {

    @Autowired
    PersonRepository personRepository;

    public PersonExistenceService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void checkEmailExists(String email) {
        if (personRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }
    }

    public void checkCpfExists(String cpf) {
        if (personRepository.existsByCpf(cpf)) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }
    }
}

package com.virtualstore.backend.Validators;

import com.virtualstore.backend.repository.PersonRepository;

public class PersonExistenceService {

    private final PersonRepository personRepository;

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

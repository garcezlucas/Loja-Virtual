package com.virtualstore.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.virtualstore.backend.Validators.CPFValidator;
import com.virtualstore.backend.Validators.EmailValidator;
import com.virtualstore.backend.Validators.PersonExistenceService;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonRepository;
import com.virtualstore.backend.service.PersonService;

@Configuration
public class PersonServiceConfiguration {

    @Bean
    public PersonService personService(PersonRepository personRepository,
            CityRepository cityRepository,
            PersonExistenceService personExistenceService) {
        return new PersonService(personRepository,
                cityRepository,
                personExistenceService,
                new CPFValidator(),
                new EmailValidator());
    }

    @Bean
    public PersonExistenceService personExistenceService(PersonRepository personRepository) {
        return new PersonExistenceService(personRepository);
    }
}
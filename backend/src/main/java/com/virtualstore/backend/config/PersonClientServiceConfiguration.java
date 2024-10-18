package com.virtualstore.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.virtualstore.backend.Validators.CPFValidator;
import com.virtualstore.backend.Validators.EmailValidator;
import com.virtualstore.backend.Validators.PersonExistenceService;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.PersonClientRepository;
import com.virtualstore.backend.repository.PersonRepository;
import com.virtualstore.backend.service.EmailService;
import com.virtualstore.backend.service.PersonClientService;
import com.virtualstore.backend.service.PersonPermissionService;

@Configuration
public class PersonClientServiceConfiguration {

    @Bean
    public PersonClientService personClientService(PersonClientRepository personClientRepository,
            PersonPermissionService personPermissionService,
            EmailService emailService,
            CityRepository cityRepository,
            PersonExistenceService personExistenceService,
            CPFValidator cpfValidator,
            EmailValidator emailValidator) {
        return new PersonClientService(personClientRepository,
                personPermissionService,
                emailService,
                cityRepository,
                personExistenceService,
                cpfValidator,
                emailValidator);
    }

    @Bean
    public CPFValidator cpfValidator() {
        return new CPFValidator();
    }

    @Bean
    public EmailValidator emailValidator() {
        return new EmailValidator();
    }

    @Bean(name = "personClientExistenceService")
    public PersonExistenceService personExistenceService(PersonRepository personRepository) {
        return new PersonExistenceService(personRepository);
    }
}

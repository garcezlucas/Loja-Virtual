package com.virtualstore.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonDetailService implements UserDetailsService {

    @Autowired
    PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByEmail(username);

        if (person == null) {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        return person;
    }

}

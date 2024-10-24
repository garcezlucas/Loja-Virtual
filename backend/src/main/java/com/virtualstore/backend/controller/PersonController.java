package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.service.PersonService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping("/")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @PostMapping("/")
    public Person createPerson(@RequestBody Person person) {
        return personService.create(person);
    }

    @PutMapping("/")
    public Person updatePerson(@RequestBody Person person) {
        return personService.update(person);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePerson(@PathVariable("id") Long id) {
        personService.remove(id);
        return ResponseEntity.ok().build();
    }
}

package com.virtualstore.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.dto.PersonClientRequestDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.service.PersonClientService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/client")
public class PersonClientController {

    @Autowired
    private PersonClientService personClientService;

    @PostMapping("/")
    public Person createPerson(@RequestBody PersonClientRequestDTO personClientRequestDTO) {

        return personClientService.create(personClientRequestDTO);
    }

}

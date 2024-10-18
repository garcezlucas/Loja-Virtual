package com.virtualstore.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.dto.PersonPasswordRequestDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.service.PersonManagementService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/management")
public class PersonManagementController {

    @Autowired
    private PersonManagementService personManagementService;

    @PostMapping("/password-code")
    public String recoveryCode(@RequestBody Person person) {
        String personEmail = person.getEmail();

        return personManagementService.requestCode(personEmail);
    }

    @PostMapping("/password-change")
    public String changePassword(@RequestBody PersonPasswordRequestDTO personPassword) {

        return personManagementService.passwordChange(personPassword);
    }

}

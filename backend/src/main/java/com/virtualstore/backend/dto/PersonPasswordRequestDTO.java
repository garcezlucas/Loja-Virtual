package com.virtualstore.backend.dto;

import org.springframework.beans.BeanUtils;

import com.virtualstore.backend.entity.Person;

import lombok.Data;

@Data
public class PersonPasswordRequestDTO {

    private String email;

    private String recoverPasswordCode;

    private String password;

    public Person converter(PersonPasswordRequestDTO personPasswordRequestDTO) {
        Person person = new Person();
        BeanUtils.copyProperties(personPasswordRequestDTO, person);
        return person;
    }
}

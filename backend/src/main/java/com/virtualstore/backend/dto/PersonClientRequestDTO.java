package com.virtualstore.backend.dto;

import org.springframework.beans.BeanUtils;

import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.Person;

import lombok.Data;

@Data
public class PersonClientRequestDTO {

    private String name;

    private String cpf;

    private String email;

    private String address;

    private String codePostal;

    private City city;

    public Person converter(PersonClientRequestDTO personClientRequestDTO) {
        Person person = new Person();
        BeanUtils.copyProperties(personClientRequestDTO, person);
        return person;
    }
}

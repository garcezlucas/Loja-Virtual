package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Permission;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.entity.PersonPermission;
import com.virtualstore.backend.repository.PermissionRepository;
import com.virtualstore.backend.repository.PersonPermissionRepository;
import com.virtualstore.backend.repository.PersonRepository;

@Service
public class PersonPermissionService {

    @Autowired
    private PersonPermissionRepository personPermissionRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    public List<PersonPermission> getAllPersonPermissions() {
        return personPermissionRepository.findAll();
    }

    public PersonPermission create(PersonPermission personPermission) {
        Long personId = personPermission.getPerson().getId();

        Long permissionId = personPermission.getPermission().getId();

        Optional<Person> personOpt = personRepository.findById(personId);

        Optional<Permission> permissionOpt = permissionRepository.findById(permissionId);

        personPermission.setCreationDate(new Date());
        PersonPermission newPersonPermission = personPermissionRepository.saveAndFlush(personPermission);

        PersonPermission returnPersonPermission = newPersonPermission;
        returnPersonPermission.setPerson(personOpt.get());
        returnPersonPermission.setPermission(permissionOpt.get());

        return returnPersonPermission;
    }

    public PersonPermission update(PersonPermission personPermission) {
        personPermission.setUpdateDate(new Date());

        PersonPermission updatePersonPermission = personPermissionRepository.saveAndFlush(personPermission);

        return updatePersonPermission;
    }

    public void remove(Long id) {
        PersonPermission personPermission = personPermissionRepository.findById(id).get();

        personPermissionRepository.delete(personPermission);

    }
}

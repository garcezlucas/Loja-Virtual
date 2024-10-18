package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Permission;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.entity.PersonPermission;
import com.virtualstore.backend.repository.PermissionRepository;
import com.virtualstore.backend.repository.PersonPermissionRepository;

@Service
public class PersonPermissionService {

    @Autowired
    private PersonPermissionRepository personPermissionRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    public void linkClientPersonPermission(Person person) {

        List<Permission> permissionList = permissionRepository.findByName("cliente");
        if (permissionList.size() > 0) {
            PersonPermission personPermission = new PersonPermission();
            personPermission.setPerson(person);
            personPermission.setPermission(permissionList.get(0));
            personPermission.setCreationDate(new Date());

            personPermissionRepository.saveAndFlush(personPermission);
        }
    }
}

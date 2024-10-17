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

import com.virtualstore.backend.entity.PersonPermission;
import com.virtualstore.backend.service.PersonPermissionService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/personpermission")
public class PersonPermissionController {

    @Autowired
    private PersonPermissionService personPermissionService;

    @GetMapping("/")
    public List<PersonPermission> getAllPersonPermissions() {
        return personPermissionService.getAllPersonPermissions();
    }

    @PostMapping("/")
    public PersonPermission createPersonPermission(@RequestBody PersonPermission personPermission) {
        return personPermissionService.create(personPermission);
    }

    @PutMapping("/")
    public PersonPermission updatePersonPermission(@RequestBody PersonPermission personPermission) {
        return personPermissionService.update(personPermission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePersonPermission(@PathVariable("id") Long id) {
        personPermissionService.remove(id);
        return ResponseEntity.ok().build();
    }
}

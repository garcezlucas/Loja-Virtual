package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Permission;
import com.virtualstore.backend.service.PermissionService;

@RestController
@RequestMapping("/api/permission")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @PostMapping("/")
    public Permission createPermission(@RequestBody Permission permission) {
        return permissionService.create(permission);
    }

    @PutMapping("/")
    public Permission updatePermission(@RequestBody Permission permission) {
        return permissionService.update(permission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePermission(@PathVariable("id") Long id) {
        permissionService.remove(id);
        return ResponseEntity.ok().build();
    }
}

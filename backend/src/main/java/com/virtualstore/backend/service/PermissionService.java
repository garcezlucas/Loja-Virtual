package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Permission;
import com.virtualstore.backend.repository.PermissionRepository;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission create(Permission permission) {
        permission.setCreationDate(new Date());
        Permission newPermission = permissionRepository.saveAndFlush(permission);
        return newPermission;
    }

    public Permission update(Permission permission) {
        Permission existingPermission = permissionRepository.findById(permission.getId())
                .orElseThrow(() -> new IllegalArgumentException("Permissão inválida!"));
        Date createDate = existingPermission.getCreationDate();

        permission.setCreationDate(createDate);
        permission.setUpdateDate(new Date());
        Permission updatePermission = permissionRepository.saveAndFlush(permission);
        return updatePermission;
    }

    public void remove(Long id) {
        Permission permission = permissionRepository.findById(id).get();
        permissionRepository.delete(permission);

    }
}

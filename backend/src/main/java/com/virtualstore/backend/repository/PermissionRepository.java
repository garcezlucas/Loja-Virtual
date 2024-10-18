package com.virtualstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    List<Permission> findByName(String name);
}

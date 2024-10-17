package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

}

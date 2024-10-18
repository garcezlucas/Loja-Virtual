package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.PersonPermission;

public interface PersonPermissionRepository extends JpaRepository<PersonPermission, Long> {

}

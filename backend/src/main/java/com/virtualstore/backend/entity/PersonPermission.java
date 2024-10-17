package com.virtualstore.backend.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "person_permission")
@Data
public class PersonPermission {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany
    @JoinColumn(name = "idPerson")
    private Person person;

    @ManyToMany
    @JoinColumn(name = "idPermission")
    private Permission permission;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;
}

package com.virtualstore.backend.entity;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "person")
@Data
public class Person implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String cpf;

    private String email;

    private String recoverPasswordCode;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sendCodeDate;

    private String password;

    private String address;

    private String codePostal;

    @ManyToOne
    @JoinColumn(name = "idCity")
    private City city;

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @Setter(value = AccessLevel.NONE)
    private List<PersonPermission> personPermissions;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    public void setPersonPermissions(List<PersonPermission> pp) {
        for (PersonPermission p : pp) {
            p.setPerson(this);
        }
        this.personPermissions = pp;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return personPermissions;
    }

    @Override
    public String getUsername() {
        return email;
    }
}

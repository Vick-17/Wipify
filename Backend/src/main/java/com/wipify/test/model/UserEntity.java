package com.wipify.test.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import static jakarta.persistence.FetchType.EAGER;

@Entity
@Setter
@Getter
@Table(name = "users")
public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String nom;
    private String prenom;
    private String pseudo;
    private String email;
    private String password;

    @ManyToMany
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "id_user"), inverseJoinColumns = @JoinColumn(name = "id_role"))
    private Collection<RoleEntity> roles = new ArrayList<>();

    @Column(name = "photo_path")
    private String imageName;

    @JsonIgnore
    @Transient
    private MultipartFile imageFile;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @Column(name = "confirmation_token")
    private String confirmationToken;

    public UserEntity(int id, String nom, String prenom, String pseudo, String email, String password, String telephone,
            Collection<RoleEntity> roles) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
        this.roles = roles != null ? roles : new ArrayList<>();
    }

    public UserEntity() {
        this.roles = new ArrayList<>();
    }

    public UserEntity(String pseudo, String password, Collection<SimpleGrantedAuthority> authorities) {
        this.pseudo = pseudo;
        this.password = password;
        this.roles = new ArrayList<>();
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}

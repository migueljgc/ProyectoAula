package com.proyecto.Aula.Persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Usuarios")
public class User  implements UserDetails {

    @Column(name = "ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Usuario", unique = true)
    private String user;

    @Column(name = "Contraseña")
    private String password;

    @JoinColumn(name = "ID_Tipo_Persona")
    @ManyToOne
    private PersonType personType;

    @Column(name = "Nombre_Persona")
    private String name;

    @Column(name = "Apellido_Persona")
    private String lastName;

    @Column(name = "Correo_Persona", unique = true)
    private String email;

    @JoinColumn(name = "ID_Tipo_Identificacion")
    @ManyToOne
    private IdentificationType identificationType;

    @Column(name = "Numero_Identificacion_Persona", unique = true)
    private BigInteger identificationNumber;


    @ManyToOne @JoinColumn(name = "ID_Dependencia")
    private Dependence dependence;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Rol")
    private Role role;

    @Column(name = "Estado_Usuario")
    private String stateUser;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

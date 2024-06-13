package com.proyecto.Aula.Controller.models;

import com.proyecto.Aula.Persistence.Entity.Dependence;
import com.proyecto.Aula.Persistence.Entity.IdentificationType;
import com.proyecto.Aula.Persistence.Entity.PersonType;
import com.proyecto.Aula.Persistence.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String user;
    private String password;
    private PersonType personType;
    private String name;
    private String lastName;
    private String email;
    private IdentificationType identificationType;
    private BigInteger identificationNumber;
    private String stateUser;
    private Role role;
    private Dependence dependence;

}

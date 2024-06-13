package com.proyecto.Aula.Domain.Dto;

import com.proyecto.Aula.Persistence.Entity.*;
import lombok.Data;

import java.math.BigInteger;


@Data
public class UserDTO {
    private Long Id;
    private String user;
    private String password;
    private Role role;
    private String stateUser;
    private PersonType personType;
    private Dependence dependence;
    private String name;
    private String lastName;
    private String email;
    private IdentificationType identificationType;
    private BigInteger identificationNumber;
}

package com.proyecto.Aula.Domain.Mapper;


import com.proyecto.Aula.Domain.Dto.*;
import com.proyecto.Aula.Persistence.Entity.*;

public class UserMapper {

    public static User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setUser(userDTO.getUser());
        user.setId(userDTO.getId());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setStateUser(userDTO.getStateUser());
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setIdentificationNumber(userDTO.getIdentificationNumber());
        user.setIdentificationType(userDTO.getIdentificationType());
        user.setLastName(userDTO.getLastName());
        user.setPersonType(userDTO.getPersonType());
        user.setDependence(userDTO.getDependence());
        return user;
    }

    public static UserDTO toDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUser(user.getUser());
        userDTO.setId(user.getId());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        userDTO.setStateUser(user.getStateUser());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setIdentificationNumber(user.getIdentificationNumber());
        userDTO.setIdentificationType(user.getIdentificationType());
        userDTO.setLastName(user.getLastName());
        userDTO.setPersonType(user.getPersonType());
        userDTO.setDependence(user.getDependence());
        return userDTO;
    }

}

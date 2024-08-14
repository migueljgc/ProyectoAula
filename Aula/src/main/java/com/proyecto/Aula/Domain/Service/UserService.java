package com.proyecto.Aula.Domain.Service;



import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Dto.UserDTO;
import com.proyecto.Aula.Domain.Mapper.RequestMapper;
import com.proyecto.Aula.Domain.Mapper.UserMapper;
import com.proyecto.Aula.Persistence.Entity.Request;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword)); // Actualiza la contraseña del usuario
            userRepository.save(user); // Guarda el usuario actualizado en la base de datos
        } else {
            throw new IllegalArgumentException("Email no encontrado: " + email);
        }
    }

    public UserDTO save(UserDTO userDTO) {
        userRepository.save(UserMapper.toEntity(userDTO));
        userDTO.setId(userDTO.getId());
        return userDTO;
    }
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id).map(UserMapper::toDto);
    }
    public UserDTO update(UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(userDTO.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Actualizar los campos relevantes de la solicitud existente con los valores de requestDTO
            existingUser.setName(userDTO.getName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setIdentificationNumber(userDTO.getIdentificationNumber());
            existingUser.setPersonType(userDTO.getPersonType());
            existingUser.setDependence(userDTO.getDependence());
            // Actualizar otros campos si es necesario
            userRepository.save(existingUser);
            return userDTO;
        } else {
            // Si la solicitud no existe, guardar una nueva solicitud en la base de datos
            userRepository.save(UserMapper.toEntity(userDTO));
            return userDTO;
        }
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public UserDTO update1(UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(userDTO.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setName(userDTO.getName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setIdentificationNumber(userDTO.getIdentificationNumber());
            existingUser.setPersonType(userDTO.getPersonType());
            existingUser.setUser(userDTO.getUser());
            existingUser.setPassword(userDTO.getPassword());
            existingUser.setIdentificationType(userDTO.getIdentificationType());
            existingUser.setDependence(userDTO.getDependence());
            userRepository.save(existingUser);
            return userDTO;
        } else {
            userRepository.save(UserMapper.toEntity(userDTO));
            return userDTO;
        }
    }

    public UserDTO upda(UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(userDTO.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setStateUser(userDTO.getStateUser());
            userRepository.save(existingUser);
            return userDTO;
        } else {
            userRepository.save(UserMapper.toEntity(userDTO));
            return userDTO;
        }
    }


    public void verifyUser(String username) {
        User user = userRepository.findByUser(username);
        if (user != null){
            user.setStateUser("ACTIVO");
            userRepository.save(user);
        }
    }

    }

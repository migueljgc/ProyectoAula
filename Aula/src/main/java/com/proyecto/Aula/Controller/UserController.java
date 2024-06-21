package com.proyecto.Aula.Controller;

import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Dto.UserDTO;
import com.proyecto.Aula.Domain.Service.UserService;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get")
    public List<UserDTO> get() {
        return userService.getAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        Optional<UserDTO> userDTOOptional = userService.findById(id);
        if (userDTOOptional.isPresent()) {
            UserDTO existingUser = userDTOOptional.get();
            existingUser.setName(userDTO.getName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setIdentificationNumber(userDTO.getIdentificationNumber());
            existingUser.setPersonType(userDTO.getPersonType());
            existingUser.setDependence(userDTO.getDependence());
            // Actualizar otros campos si es necesario
            UserDTO updatedUserDTO = userService.update(existingUser); // Guardar los cambios en la solicitud existente
            return ResponseEntity.ok(updatedUserDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/editar")
    public ResponseEntity<UserDTO> updateCurrentUser(@RequestBody UserDTO userDto) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        userDto.setUser(username);  // Assuming the UserDTO has a user field to store the username
        UserDTO updatedUser = userService.update1(userDto);
        return ResponseEntity.ok(updatedUser);
    }




}



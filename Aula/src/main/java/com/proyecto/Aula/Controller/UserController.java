package com.proyecto.Aula.Controller;

import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Dto.UserDTO;
import com.proyecto.Aula.Domain.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            // Actualizar otros campos si es necesario
            UserDTO updatedUserDTO = userService.update(existingUser); // Guardar los cambios en la solicitud existente
            return ResponseEntity.ok(updatedUserDTO);
        }
        return ResponseEntity.notFound().build();
    }

}



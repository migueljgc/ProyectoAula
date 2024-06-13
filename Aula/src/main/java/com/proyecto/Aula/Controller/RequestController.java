package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Service.RequestServices;
import com.proyecto.Aula.Persistence.Entity.Request;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.RequestRepository;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    @Autowired
    private RequestServices requestServices;
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<String> guardarSolicitud(@RequestBody Request request) {
        // Obtenemos el usuario autenticado
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Buscamos el usuario en la base de datos
        User user = userRepository.findByUser(userDetails.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
        }

        // Creamos la solicitud
        request.setUser(user);
        requestRepository.save(request); // Guardamos la solicitud en la base de datos

        return ResponseEntity.status(HttpStatus.CREATED).body("Solicitud guardada exitosamente");
    }

    @GetMapping("/get")
    public List<RequestDTO> get() {
        return requestServices.getAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody RequestDTO requestDTO) {
        Optional<RequestDTO> requestDTOOptional = requestServices.findById(id);
        if (requestDTOOptional.isPresent()) {
            RequestDTO existingRequest = requestDTOOptional.get();
            existingRequest.setRequestState(requestDTO.getRequestState());
            existingRequest.setAnswer(requestDTO.getAnswer());
            // Actualizar otros campos si es necesario
            RequestDTO updatedRequestDTO = requestServices.save(existingRequest); // Guardar los cambios en la solicitud existente
            return ResponseEntity.ok(updatedRequestDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/updates")
    public ResponseEntity<?> updates(@PathVariable Long id, @RequestBody Request request) {
            requestServices.saves(request);
            return ResponseEntity.ok("Datos Actualizadoa Correctamente");
    }
}

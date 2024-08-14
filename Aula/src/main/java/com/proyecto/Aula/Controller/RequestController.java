package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Service.RequestServices;
import com.proyecto.Aula.Persistence.Entity.Request;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.RequestRepository;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    @Autowired
    private RequestServices requestServices;
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private UserRepository userRepository;

    //private final Path fileStorageLocation = Paths.get("files").toAbsolutePath().normalize();
    // Ruta para guardar archivos
    @Value("${file.upload-dir:/var/data/uploads}")
    private String uploadDir;
    @PostMapping("/save")
    public ResponseEntity<String> guardarSolicitud(@RequestPart("request") Request request, @RequestPart(value = "archivo", required = false) MultipartFile archivo) {
        // Obtenemos el usuario autenticado
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Buscamos el usuario en la base de datos
        User user = userRepository.findByUser(userDetails.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
        }

        if (archivo != null && !archivo.isEmpty()) {
            try {

                //Si la Carpeta no Existe se crea
                //Files.createDirectories(fileStorageLocation);
                Files.createDirectories(Paths.get(uploadDir));

                // Guardar el archivo
                String fileName = archivo.getOriginalFilename();
                System.out.println(fileName);
                //Path targetLocation = this.fileStorageLocation.resolve(fileName);
                Path targetLocation = Paths.get(uploadDir).resolve(fileName);
                System.out.println(targetLocation);
                Files.copy(archivo.getInputStream(), targetLocation);

                // Establecer la URL del archivo
                request.setArchivo(targetLocation.toString());
            } catch (IOException e) {
                System.out.println(e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo");
            }
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
        return ResponseEntity.ok("Datos Actualizados Correctamente");
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            //Path filePath = fileStorageLocation.resolve(filename).normalize();
            Path filePath = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf(Files.probeContentType(filePath)))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
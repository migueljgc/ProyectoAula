package com.proyecto.Aula.Controller;

import com.proyecto.Aula.Domain.Dto.DependenceDTO;
import com.proyecto.Aula.Domain.Service.DependenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dependence")
public class DependenceController {
    @Autowired
    private DependenceService dependenceService;

    @PostMapping("/save")
    public DependenceDTO save(@RequestBody DependenceDTO dependenceDTO){
        return dependenceService.save(dependenceDTO);
    }

    @GetMapping("/get")
    public List<DependenceDTO> get(){return dependenceService.getAll();}

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody DependenceDTO dependenceDTO) {
        Optional<DependenceDTO> dependenceDTOOptional = dependenceService.findById(dependenceDTO.getIdDependence());
        if(dependenceDTOOptional.isPresent()) {
            dependenceService.save(dependenceDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

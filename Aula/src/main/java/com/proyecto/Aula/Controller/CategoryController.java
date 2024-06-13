package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Domain.Dto.CategoryDTO;
import com.proyecto.Aula.Domain.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired

    private CategoryService categoryService;

    @PostMapping("/save")
    public CategoryDTO save(@RequestBody CategoryDTO categoryDTO){
        return categoryService.save(categoryDTO);
    }

    @GetMapping("/get")
    public List<CategoryDTO> get(){return categoryService.getAll();}

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody CategoryDTO categoryDTO) {
        Optional<CategoryDTO> categoryDTOOptional = categoryService.findById(categoryDTO.getIdCategory());
        if(categoryDTOOptional.isPresent()) {
            categoryService.save(categoryDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

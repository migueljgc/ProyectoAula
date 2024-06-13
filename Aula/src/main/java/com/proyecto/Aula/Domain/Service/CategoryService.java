package com.proyecto.Aula.Domain.Service;


import com.proyecto.Aula.Domain.Dto.CategoryDTO;
import com.proyecto.Aula.Domain.Mapper.CategoryMapper;
import com.proyecto.Aula.Persistence.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
@Autowired
    private CategoryRepository categoryRepository;

    public CategoryDTO save(CategoryDTO categoryDTO) {
        categoryRepository.save(CategoryMapper.toEntity(categoryDTO));
        return categoryDTO;
    }

    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll().stream().map(CategoryMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<CategoryDTO> findById(Long id) {
        return categoryRepository.findById(id).map(CategoryMapper::toDTO);
    }
}

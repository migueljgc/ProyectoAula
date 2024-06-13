package com.proyecto.Aula.Domain.Mapper;


import com.proyecto.Aula.Domain.Dto.CategoryDTO;
import com.proyecto.Aula.Persistence.Entity.Category;

public class CategoryMapper {
    public static Category toEntity(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setIdCategory(categoryDTO.getIdCategory());
        category.setNameCategory(categoryDTO.getNameCategory());
        category.setDependence(categoryDTO.getDependence());
        return category;
    }

    public static CategoryDTO toDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setIdCategory(category.getIdCategory());
        categoryDTO.setNameCategory(category.getNameCategory());
        categoryDTO.setDependence(category.getDependence());
        return categoryDTO;
    }
}

package com.proyecto.Aula.Domain.Mapper;


import com.proyecto.Aula.Domain.Dto.DependenceDTO;
import com.proyecto.Aula.Persistence.Entity.Dependence;

public class DependenceMapper {
    public static Dependence toEntity(DependenceDTO dependenceDTO) {
        Dependence dependence = new Dependence();
        dependence.setIdDependence(dependenceDTO.getIdDependence());
        dependence.setNameDependence(dependenceDTO.getNameDependence());
        return dependence;
    }

    public static DependenceDTO toDTO(Dependence dependence) {
        DependenceDTO dependenceDTO = new DependenceDTO();
        dependenceDTO.setIdDependence(dependence.getIdDependence());
        dependenceDTO.setNameDependence(dependence.getNameDependence());
        return dependenceDTO;
    }
}

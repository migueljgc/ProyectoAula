package com.proyecto.Aula.Domain.Service;


import com.proyecto.Aula.Domain.Dto.DependenceDTO;
import com.proyecto.Aula.Domain.Mapper.DependenceMapper;
import com.proyecto.Aula.Persistence.Repository.DependenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DependenceService {
@Autowired
    private DependenceRepository dependenceRepository;

    public DependenceDTO save(DependenceDTO dependenceDTO) {
        dependenceRepository.save(DependenceMapper.toEntity(dependenceDTO));
        return dependenceDTO;
    }

    public List<DependenceDTO> getAll() {
        return dependenceRepository.findAll().stream().map(DependenceMapper::toDTO).collect(Collectors.toList());
    }
    public Optional<DependenceDTO> findById(Long id) {
        return dependenceRepository.findById(id).map(DependenceMapper::toDTO);
    }
}

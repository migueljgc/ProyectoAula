package com.proyecto.Aula.Domain.Service;


import com.proyecto.Aula.Domain.Dto.RequestStateDTO;
import com.proyecto.Aula.Domain.Mapper.RequestStateMapper;
import com.proyecto.Aula.Persistence.Repository.RequestStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RequestStateService {
    @Autowired
    RequestStateRepository requestStateRepository;

    public RequestStateDTO save(RequestStateDTO requestStateDTO) {
        requestStateRepository.save(RequestStateMapper.toEntity(requestStateDTO));
        return requestStateDTO;
    }

    public List<RequestStateDTO> getAll() {
        return requestStateRepository.findAll().stream().map(RequestStateMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<RequestStateDTO> findById(Long id) {
        return requestStateRepository.findById(id).map(RequestStateMapper::toDTO);
    }
}

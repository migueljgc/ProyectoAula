package com.proyecto.Aula.Domain.Service;

import com.proyecto.Aula.Domain.Dto.RequestTypeDTO;
import com.proyecto.Aula.Domain.Mapper.RequestTypeMapper;
import com.proyecto.Aula.Persistence.Repository.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RequestTypeService {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    public RequestTypeDTO save(RequestTypeDTO requestTypeDTO) {
        requestTypeRepository.save(RequestTypeMapper.toEntinty(requestTypeDTO));
        return requestTypeDTO;
    }

    public List<RequestTypeDTO> getAll() {
        return requestTypeRepository.findAll().stream().map(RequestTypeMapper::toDto).collect(Collectors.toList());
    }

    public Optional<RequestTypeDTO> findById(Long id) {
        return requestTypeRepository.findById(id).map(RequestTypeMapper::toDto);
    }
}

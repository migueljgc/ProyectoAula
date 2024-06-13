package com.proyecto.Aula.Domain.Service;


import com.proyecto.Aula.Controller.models.AuthResponse;
import com.proyecto.Aula.Controller.models.RegisterRequest;
import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Domain.Mapper.RequestMapper;
import com.proyecto.Aula.Domain.Mapper.RequestTypeMapper;
import com.proyecto.Aula.Persistence.Entity.Request;
import com.proyecto.Aula.Persistence.Entity.Role;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.RequestRepository;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RequestServices {
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;


    public List<RequestDTO> getAll() {
        return requestRepository.findAll().stream().map(RequestMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<RequestDTO> findById(Long id) {
        return requestRepository.findById(id).map(RequestMapper::toDTO);
    }

    public void update(RequestDTO requestDTO) {
        Request request = RequestMapper.toEntity(requestDTO);
        requestRepository.save(request);
    }

    public RequestDTO save(RequestDTO requestDTO) {
        Optional<Request> existingRequestOptional = requestRepository.findById(requestDTO.getIdRequest());
        if (existingRequestOptional.isPresent()) {
            Request existingRequest = existingRequestOptional.get();
            // Actualizar los campos relevantes de la solicitud existente con los valores de requestDTO
            existingRequest.setRequestState(requestDTO.getRequestState());
            existingRequest.setAnswer(requestDTO.getAnswer());
            // Actualizar otros campos si es necesario
            requestRepository.save(existingRequest);
            return requestDTO;
        } else {
            // Si la solicitud no existe, guardar una nueva solicitud en la base de datos
            requestRepository.save(RequestMapper.toEntity(requestDTO));
            return requestDTO;
        }
    }

    public void saves(Request request) {
        requestRepository.save(request);
    }
}

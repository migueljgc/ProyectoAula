package com.proyecto.Aula.Domain.Mapper;


import com.proyecto.Aula.Domain.Dto.RequestDTO;
import com.proyecto.Aula.Persistence.Entity.Request;

public class RequestMapper {

    public static Request toEntity(RequestDTO requestDTO) {
        Request request = new Request();
        request.setIdRequest(request.getIdRequest());
        request.setUser(requestDTO.getUser());
        request.setRequestType(requestDTO.getRequestType());
        request.setDependence(requestDTO.getDependence());
        request.setCategory(requestDTO.getCategory());
        request.setDescription(requestDTO.getDescription());
        request.setDate(requestDTO.getDate());
        request.setAnswer(requestDTO.getAnswer());
        request.setRequestState(requestDTO.getRequestState());
        request.setMediumAnswer(requestDTO.getMediumAnswer());
        return request;
    }
    public static RequestDTO toDTO(Request request) {
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setIdRequest(request.getIdRequest());
        requestDTO.setUser(request.getUser());
        requestDTO.setRequestType(request.getRequestType());
        requestDTO.setDependence(request.getDependence());
        requestDTO.setCategory(request.getCategory());
        requestDTO.setDescription(request.getDescription());
        requestDTO.setDate(request.getDate());
        requestDTO.setAnswer(request.getAnswer());
        requestDTO.setRequestState(request.getRequestState());
        requestDTO.setMediumAnswer(request.getMediumAnswer());
        return requestDTO;
    }
}

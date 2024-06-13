package com.proyecto.Aula.Domain.Mapper;

import com.proyecto.Aula.Domain.Dto.*;
import com.proyecto.Aula.Persistence.Entity.*;

public class IdentificationTypeMapper {

    public static IdentificationType toEntity(IdentificationTypeDTO identificationTypeDTO) {
        IdentificationType identificationType = new IdentificationType();
        identificationType.setIdIdentificationType(identificationType.getIdIdentificationType());
        identificationType.setNameIdentificationType(identificationTypeDTO.getNameIdentificationType());
        return identificationType;
    }
    public static IdentificationTypeDTO toDTO(IdentificationType identificationType) {
        IdentificationTypeDTO identificationTypeDTO = new IdentificationTypeDTO();
        identificationTypeDTO.setIdIdentificationType(identificationType.getIdIdentificationType());
        identificationTypeDTO.setNameIdentificationType(identificationType.getNameIdentificationType());
        return identificationTypeDTO;
    }
}

package com.proyecto.Aula.Domain.Dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestTypeDTO {
    private Long idRequestType;
    private String nameRequestType;
}

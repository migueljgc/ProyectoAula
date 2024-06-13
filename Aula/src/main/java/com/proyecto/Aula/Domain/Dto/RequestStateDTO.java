package com.proyecto.Aula.Domain.Dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestStateDTO {
    private Long idRequestState;
    private String nameRequestState;
}

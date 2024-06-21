package com.proyecto.Aula.Domain.Dto;


import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmailDTO {
    private String [] toUser;
    private String subject;
    private String message;


}

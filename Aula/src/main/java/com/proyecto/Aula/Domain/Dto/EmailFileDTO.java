package com.proyecto.Aula.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailFileDTO {
    private String [] toUser;
    private String subject;
    private String message;
    MultipartFile file;
    private String pdfContent;


}

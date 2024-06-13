package com.proyecto.Aula.Domain.Dto;


import com.proyecto.Aula.Persistence.Entity.Dependence;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {
    private Long idCategory;
    private String nameCategory;
    private Dependence dependence;

}

package com.proyecto.Aula.Persistence.Entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Categorias")
public class Category {

    @Column(name = "ID_Categoria")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategory;

    @Column(name = "Nombre_Categoria")
    private String nameCategory;


    @ManyToOne @JoinColumn(name = "ID_Dependencia")
    private Dependence dependence;
}

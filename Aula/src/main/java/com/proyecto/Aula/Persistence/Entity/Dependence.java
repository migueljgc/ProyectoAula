package com.proyecto.Aula.Persistence.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Dependencias")
public class Dependence {

    @Column(name = "ID_Dependencia")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDependence;

    @Column(name = "Nombre_Dependencia")
    private String nameDependence;
}

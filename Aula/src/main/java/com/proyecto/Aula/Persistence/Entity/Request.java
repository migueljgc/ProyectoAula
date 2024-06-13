package com.proyecto.Aula.Persistence.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Solicitudes ")
public class Request {

    @Column(name = "ID_Solicitud")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRequest;

    @JoinColumn(name = "Usuario")
    @ManyToOne
    private User user;

    @JoinColumn(name = "ID_Tipo_Solicitud")
    @ManyToOne
    private RequestType requestType;

    @JoinColumn(name = "ID_Categoria")
    @ManyToOne
    private Category category;

    @Column(name = "Descripcion_Solicitud")
    private String description;

    @Column(name = "Fecha_Solicitud")
    private Date date;

    @Column(name = "Respuesta_Solicitud")
    private String answer;

    @JoinColumn(name = "Id_Estado_Solicitud")
    @ManyToOne
    private RequestState requestState;

    @Column(name = "Medio_Respuesta")
    private String mediumAnswer;

    @JoinColumn (name = "ID_Dependencia")
    @ManyToOne
    private Dependence dependence;
}

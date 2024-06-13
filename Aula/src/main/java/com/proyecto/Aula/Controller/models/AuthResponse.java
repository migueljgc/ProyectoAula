package com.proyecto.Aula.Controller.models;

import com.proyecto.Aula.Persistence.Entity.Dependence;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private List <String> authorities;
}

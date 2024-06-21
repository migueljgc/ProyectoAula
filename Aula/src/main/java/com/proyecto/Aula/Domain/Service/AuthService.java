package com.proyecto.Aula.Domain.Service;

import com.proyecto.Aula.Controller.models.AuthResponse;
import com.proyecto.Aula.Controller.models.AuthenticationRequest;
import com.proyecto.Aula.Controller.models.RegisterRequest;
import com.proyecto.Aula.Persistence.Entity.User;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthResponse register (RegisterRequest Request );
    AuthResponse authenticate (AuthenticationRequest Request );
    AuthResponse registerAd (RegisterRequest Request );
    AuthResponse registerSe (RegisterRequest Request );
    User getCurrentUser(Authentication authentication);

    ;
}

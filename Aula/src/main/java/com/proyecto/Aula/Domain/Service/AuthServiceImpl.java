package com.proyecto.Aula.Domain.Service;

import com.proyecto.Aula.Controller.models.AuthResponse;
import com.proyecto.Aula.Controller.models.AuthenticationRequest;
import com.proyecto.Aula.Controller.models.RegisterRequest;
import com.proyecto.Aula.Persistence.Entity.Dependence;
import com.proyecto.Aula.Persistence.Entity.Role;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .user(request.getUser())
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .stateUser("ACTIVO")
                .identificationType(request.getIdentificationType())
                .identificationNumber(request.getIdentificationNumber())
                .personType(request.getPersonType())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .dependence(request.getDependence())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);
        return AuthResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUser(),
                        request.getPassword()
                )
        );
        UserDetails user = userRepository.findUserByUser(request.getUser()).orElseThrow();
        String jwtToken = jwtService.genereteToken(user);
        List<String> roles = user.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());

        return AuthResponse.builder()
                .token(jwtToken)
                .authorities(roles)
                .build();
    }


    public AuthResponse registerAd(RegisterRequest request) {
        var user = User.builder()
                .user(request.getUser())
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .stateUser("ACTIVO")
                .identificationType(request.getIdentificationType())
                .identificationNumber(request.getIdentificationNumber())
                .personType(request.getPersonType())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .dependence(request.getDependence())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);
        return AuthResponse.builder()
                .token(jwtToken).build();
    }
    public AuthResponse registerSe(RegisterRequest request) {
        var user = User.builder()
                .user(request.getUser())
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .stateUser("ACTIVO")
                .identificationType(request.getIdentificationType())
                .identificationNumber(request.getIdentificationNumber())
                .personType(request.getPersonType())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.SECRE)
                .dependence(request.getDependence())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);
        return AuthResponse.builder()
                .token(jwtToken).build();
    }
}

